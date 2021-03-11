import axios from 'axios';
import Storage from '../classes/Storage';
import WS from '../classes/WS';

const apiKey = 'bf2d7e9edf9f06d61da703995815d02eab947de80859a50706911c96b37f72ce';
const AGGREGATE_INDEX = '5';

const axiosInstance = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
});

const subscribers = new Map();
const storage = new Storage(window.localStorage);
const ws = new WS(`${'wss://streamer.cryptocompare.com/v2?api_key='}${apiKey}`, (msg) => {
  if (msg.TYPE === AGGREGATE_INDEX && msg.PRICE) {
    const cb = subscribers.get(msg.FROMSYMBOL);
    if (typeof cb === 'function') cb(msg.PRICE);
  }
});

function addCoinToWatch({ symbol, currency }, cb) {
  subscribers.set(symbol, cb);

  ws.send({
    action: 'SubAdd',
    subs: [`${AGGREGATE_INDEX}~CCCAGG~${symbol}~${currency}`],
  });
}

function removeCoinFromWatch({ symbol, currency }) {
  subscribers.delete(symbol);

  ws.send({
    action: 'SubRemove',
    subs: [`${AGGREGATE_INDEX}~CCCAGG~${symbol}~${currency}`],
  });
}

async function getAvailableCoins() {
  let availableCoins = storage.getItem('availableCoins');

  if (!Array.isArray(availableCoins) || availableCoins.length === 0) {
    const response = await axiosInstance.get('/all/coinlist?summary=true');

    if (response.data && response.data.Data) {
      availableCoins = Object.values(response.data.Data).map(({ Id, Symbol }) => ({
        id: Id,
        symbol: Symbol,
      }));
    }
  }

  return availableCoins;
}

function subscribeToUpdateCoin(coin, cb) {
  addCoinToWatch(coin, cb);
}

function subscribeToUpdateCoinList(coinList, cb) {
  coinList.forEach((coin) => subscribeToUpdateCoin(coin, cb));
}

function unsubscribeToUpdateCoin(coin) {
  removeCoinFromWatch(coin);
}

function unsubscribeToUpdateCoinList(coinList) {
  coinList.forEach((coin) => unsubscribeToUpdateCoin(coin));
}

export {
  getAvailableCoins,
  subscribeToUpdateCoin,
  subscribeToUpdateCoinList,
  unsubscribeToUpdateCoin,
  unsubscribeToUpdateCoinList,
};
