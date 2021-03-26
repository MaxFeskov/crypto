import WS from '../classes/WS';
import {
  AGGREGATE_INDEX_TYPE,
  EXCHANGE_INDEX,
  INVALID_SUB_MESSAGE,
  SUBSCRIBECOMPLETE_MESSAGE,
  SUBSCRIPTION_ALREADY_ACTIVE_MESSAGE,
  SUBSCRIPTION_UNRECOGNIZED_MESSAGE,
  UNSUBSCRIBECOMPLETE_MESSAGE,
} from './const';

const apiKey = 'bf2d7e9edf9f06d61da703995815d02eab947de80859a50706911c96b37f72ce';
const ws = new WS(`${'wss://streamer.cryptocompare.com/v2?api_key='}${apiKey}`);

const parseParameter = (parameter = '') => {
  const [, , coinSymbol, valute] = parameter.split('~');

  return {
    coinSymbol,
    valute,
  };
};

const onMessage = (cb) => ws.subscribe(cb);

const addCoinToWatch = (symbol, currency) =>
  new Promise((resolve, reject) => {
    const wsOnMessage = (msg) => {
      switch (msg.MESSAGE) {
        case SUBSCRIBECOMPLETE_MESSAGE: {
          const { coinSymbol, valute } = parseParameter(msg.SUB);

          if (coinSymbol === symbol && valute === currency) {
            ws.unsubscribe(wsOnMessage);
            resolve({
              symbol,
              currency,
            });
          }
          break;
        }

        case SUBSCRIPTION_ALREADY_ACTIVE_MESSAGE: {
          const { coinSymbol, valute } = parseParameter(msg.PARAMETER);

          if (coinSymbol === symbol && valute === currency) {
            ws.unsubscribe(wsOnMessage);
            resolve({
              symbol,
              currency,
            });
          }
          break;
        }

        case INVALID_SUB_MESSAGE: {
          const { coinSymbol, valute } = parseParameter(msg.PARAMETER);

          if (coinSymbol === symbol && valute === currency) {
            ws.unsubscribe(wsOnMessage);
            reject();
          }

          break;
        }

        default: // do nothing
      }
    };

    ws.send({
      action: 'SubAdd',
      subs: [`${AGGREGATE_INDEX_TYPE}~${EXCHANGE_INDEX}~${symbol}~${currency}`],
    }).subscribe(wsOnMessage);
  });

const removeCoinFromWatch = (symbol, currency) =>
  new Promise((resolve, reject) => {
    const wsOnMessage = (msg) => {
      switch (msg.MESSAGE) {
        case UNSUBSCRIBECOMPLETE_MESSAGE: {
          const { coinSymbol, valute } = parseParameter(msg.SUB);

          if (symbol === coinSymbol && valute === currency) {
            ws.unsubscribe(wsOnMessage);
            resolve();
          }
          break;
        }

        case SUBSCRIPTION_UNRECOGNIZED_MESSAGE: {
          const { coinSymbol, valute } = parseParameter(msg.PARAMETER);

          if (symbol === coinSymbol && valute === currency) {
            ws.unsubscribe(wsOnMessage);
            reject();
          }
          break;
        }

        default: // do nothing
      }
    };

    ws.send({
      action: 'SubRemove',
      subs: [`${AGGREGATE_INDEX_TYPE}~${EXCHANGE_INDEX}~${symbol}~${currency}`],
    }).subscribe(wsOnMessage);
  });

export { onMessage, addCoinToWatch, removeCoinFromWatch };
