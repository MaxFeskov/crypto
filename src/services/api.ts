import axios from 'axios';
import Storage from '../classes/Storage';
import TickerSubscribers from '../classes/TickerSubscribers';
import { AGGREGATE_INDEX_TYPE, DEFAULT_CURRENCY } from './const';
import { addCoinToWatch, removeCoinFromWatch, onMessage } from './wsapi';

const storage = new Storage(window.sessionStorage);
const tickerSubscribers = new TickerSubscribers();

type Coin = {
  symbol: string;
  currency: string;
};

type AvailableCoinsResponseData = {
  [k: string]: {
    Id: string;
    Symbol: string;
    ImageUrl: string;
    FullName: string;
  };
};

export type AvailableCoinSymbols = Array<string>;

type AggregateIndexMessage = {
  TYPE: typeof AGGREGATE_INDEX_TYPE;
  FROMSYMBOL: string;
  TOSYMBOL: string;
  PRICE: number;
};

const onAggregateIndexMessage = (msg: AggregateIndexMessage) => {
  tickerSubscribers.callTickerSubscriber(`${msg.FROMSYMBOL}:${msg.TOSYMBOL}`, msg.PRICE);
};

onMessage((msg: any) => {
  if (msg.TYPE === AGGREGATE_INDEX_TYPE) {
    onAggregateIndexMessage(msg);
  }
});

const getAvailableCoinSymbols = async () => {
  let availableCoinSymbols: AvailableCoinSymbols = storage.getItem('availableCoins') || [];

  if (!Array.isArray(availableCoinSymbols) || availableCoinSymbols.length === 0) {
    const response = await axios.get(
      'https://min-api.cryptocompare.com/data/all/coinlist?summary=true',
    );

    if (response?.data?.Data) {
      availableCoinSymbols = Object.values(response.data.Data as AvailableCoinsResponseData)
        .map(({ Symbol }) => Symbol)
        .sort();

      storage.setItem('availableCoins', availableCoinSymbols);
    }
  }

  return availableCoinSymbols;
};

const searchCoins = async (
  { searchString, maxResultsCount = Infinity }: { searchString: string; maxResultsCount: number },
  cb: (availableCoinSymbols: AvailableCoinSymbols) => void,
) => {
  if (searchString) {
    const availableCoinSymbols: AvailableCoinSymbols = await getAvailableCoinSymbols();

    cb(
      availableCoinSymbols
        .filter((coinSymbol: string) => coinSymbol.includes(searchString))
        .sort((a: string, b: string) => a.indexOf(searchString) - b.indexOf(searchString))
        .slice(0, maxResultsCount),
    );
  } else {
    cb([]);
  }
};

const subscribeToUpdateCoin = (
  { symbol, currency }: Coin,
  subscribeCb: (price: number) => void,
  cb?: (error?: string) => void,
) => {
  const ticker = `${symbol}:${currency}`;

  addCoinToWatch(symbol, currency).then(
    () => {
      tickerSubscribers.setTickerSubscriber(ticker, subscribeCb);
    },
    () => {
      const coinList: Array<[string, string]> = [];

      if (currency !== DEFAULT_CURRENCY) coinList.push([DEFAULT_CURRENCY, currency]);
      if (symbol !== DEFAULT_CURRENCY) coinList.push([symbol, DEFAULT_CURRENCY]);

      Promise.all(coinList.map((coin) => addCoinToWatch(...coin))).then(
        (valuesList) => {
          if (valuesList.length) {
            tickerSubscribers.setTickerSubscriber(ticker, subscribeCb);

            valuesList.forEach((item: any) => {
              tickerSubscribers.setTickerDepends(
                `${item.symbol}:${item.currency}`,
                `${symbol}:${currency}`,
              );
            });
          } else {
            cb?.(ticker);
          }
        },
        () => {
          cb?.(ticker);
        },
      );
    },
  );
};

const unsubscribeToUpdateCoin = ({ symbol, currency }: Coin, cb?: (error?: string) => void) => {
  const ticker = `${symbol}:${currency}`;

  tickerSubscribers.deleteTicker(ticker);

  if (!tickerSubscribers.hasTicker(ticker)) {
    removeCoinFromWatch(symbol, currency).then(
      () => {
        cb?.();
      },
      () => {
        const coinList: Array<[string, string]> = [];

        if (!tickerSubscribers.hasTicker(`${DEFAULT_CURRENCY}:${currency}`))
          coinList.push([DEFAULT_CURRENCY, currency]);

        if (!tickerSubscribers.hasTicker(`${symbol}:${DEFAULT_CURRENCY}`))
          coinList.push([symbol, DEFAULT_CURRENCY]);

        Promise.all(coinList.map((coin) => removeCoinFromWatch(...coin))).then(
          () => {
            cb?.();
          },
          () => {
            cb?.(ticker);
          },
        );
      },
    );
  }
};

export { getAvailableCoinSymbols, searchCoins, subscribeToUpdateCoin, unsubscribeToUpdateCoin };
