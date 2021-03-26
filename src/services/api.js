import axios from 'axios';
import Storage from '../classes/Storage';
import Subscribers from '../classes/Subscribers';
import { AGGREGATE_INDEX_TYPE, INTERMEDIATE_CURRENCY } from './const';
import { addCoinToWatch, removeCoinFromWatch, onMessage } from './wsapi';

const storage = new Storage(window.sessionStorage);
const subscribers = new Subscribers();

window.subscribers = subscribers;

const onAggregateIndexMessage = (msg) => {
  subscribers.call(`${msg.FROMSYMBOL}:${msg.TOSYMBOL}`, msg.PRICE);
};

onMessage((msg) => {
  if (msg.TYPE === AGGREGATE_INDEX_TYPE) {
    onAggregateIndexMessage(msg);
  }
});

const getAvailableCoins = async () => {
  let availableCoins = storage.getItem('availableCoins') || [];

  if (!Array.isArray(availableCoins) || availableCoins.length === 0) {
    const response = await axios.get(
      'https://min-api.cryptocompare.com/data/all/coinlist?summary=true',
    );

    if (response.data && response.data.Data) {
      availableCoins = Object.values(response.data.Data)
        .map(({ Symbol }) => Symbol)
        .sort();

      storage.setItem('availableCoins', availableCoins);
    }
  }

  return availableCoins;
};

const searchCoins = async ({ searchString, maxResultsCount = Infinity }, cb) => {
  if (searchString) {
    const availableCoins = await getAvailableCoins();

    cb(
      availableCoins
        .filter((item) => item.includes(searchString))
        .sort((a, b) => a.indexOf(searchString) - b.indexOf(searchString))
        .slice(0, maxResultsCount),
    );
  } else {
    cb([]);
  }
};

const subscribeToUpdateCoin = ({ symbol, currency }, cb, fail) => {
  addCoinToWatch(symbol, currency).then(
    () => {
      subscribers.set(`${symbol}:${currency}`, cb);
    },
    () => {
      const promiseList = [];

      if (currency !== INTERMEDIATE_CURRENCY) {
        promiseList.push(addCoinToWatch(INTERMEDIATE_CURRENCY, currency));
      }

      if (symbol !== INTERMEDIATE_CURRENCY) {
        promiseList.push(addCoinToWatch(symbol, INTERMEDIATE_CURRENCY));
      }

      Promise.all(promiseList).then(
        (valuesList) => {
          if (valuesList.length) {
            subscribers.set(`${symbol}:${currency}`, cb);

            valuesList.forEach((value) => {
              subscribers.set(`${value.symbol}:${value.currency}`, `${symbol}:${currency}`);
            });
          } else if (typeof fail === 'function') {
            fail();
          }
        },
        () => {
          if (typeof fail === 'function') {
            fail();
          }
        },
      );
    },
  );
};

const unsubscribeToUpdateCoin = ({ symbol, currency }, done) => {
  const key = `${symbol}:${currency}`;
  subscribers.delete(key);

  if (!subscribers.hasKey(key)) {
    removeCoinFromWatch(symbol, currency).then(
      () => {
        if (typeof done === 'function') {
          done();
        }
      },
      () => {
        const promiseList = [];

        if (!subscribers.hasKey(`${INTERMEDIATE_CURRENCY}:${currency}`)) {
          promiseList.push(removeCoinFromWatch(INTERMEDIATE_CURRENCY, currency));
        }

        if (!subscribers.hasKey(`${symbol}:${INTERMEDIATE_CURRENCY}`)) {
          promiseList.push(removeCoinFromWatch(symbol, INTERMEDIATE_CURRENCY));
        }

        Promise.all(promiseList).finally(() => {
          if (typeof done === 'function') {
            done();
          }
        });
      },
    );
  }
};

export { getAvailableCoins, searchCoins, subscribeToUpdateCoin, unsubscribeToUpdateCoin };
