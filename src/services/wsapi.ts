import WS from '../classes/WS';
import { AGGREGATE_INDEX_TYPE } from './const';

const EXCHANGE_INDEX = 'CCCAGG';
const SUBSCRIBECOMPLETE_MESSAGE = 'SUBSCRIBECOMPLETE';
const SUBSCRIPTION_UNRECOGNIZED_MESSAGE = 'SUBSCRIPTION_UNRECOGNIZED';
const SUBSCRIPTION_ALREADY_ACTIVE_MESSAGE = 'SUBSCRIPTION_ALREADY_ACTIVE';
const UNSUBSCRIBECOMPLETE_MESSAGE = 'UNSUBSCRIBECOMPLETE';
const INVALID_SUB_MESSAGE = 'INVALID_SUB';

const apiKey = 'bf2d7e9edf9f06d61da703995815d02eab947de80859a50706911c96b37f72ce';
const ws = new WS(`${'wss://streamer.cryptocompare.com/v2?api_key='}${apiKey}`);

const parseParameter = (parameter = '') => {
  const [, , coinSymbol, valute] = parameter.split('~');

  return { coinSymbol, valute };
};

type Message =
  | { MESSAGE: typeof SUBSCRIBECOMPLETE_MESSAGE; SUB: string }
  | { MESSAGE: typeof SUBSCRIPTION_ALREADY_ACTIVE_MESSAGE; PARAMETER: string }
  | { MESSAGE: typeof INVALID_SUB_MESSAGE; PARAMETER: string }
  | { MESSAGE: typeof UNSUBSCRIBECOMPLETE_MESSAGE; SUB: string }
  | { MESSAGE: typeof SUBSCRIPTION_UNRECOGNIZED_MESSAGE; PARAMETER: string };

const onMessage = (cb: (message: Message) => void) => ws.subscribe(cb);

const addCoinToWatch = (symbol: string, currency: string) =>
  new Promise((resolve, reject) => {
    const wsOnMessage = (msg: Message) => {
      if (msg.MESSAGE === SUBSCRIBECOMPLETE_MESSAGE) {
        const { coinSymbol, valute } = parseParameter(msg.SUB);

        if (coinSymbol === symbol && valute === currency) {
          ws.unsubscribe(wsOnMessage);

          return resolve({ symbol, currency });
        }
      }

      if (msg.MESSAGE === SUBSCRIPTION_ALREADY_ACTIVE_MESSAGE) {
        const { coinSymbol, valute } = parseParameter(msg.PARAMETER);

        if (coinSymbol === symbol && valute === currency) {
          ws.unsubscribe(wsOnMessage);

          return resolve({ symbol, currency });
        }
      }

      if (msg.MESSAGE === INVALID_SUB_MESSAGE) {
        const { coinSymbol, valute } = parseParameter(msg.PARAMETER);

        if (coinSymbol === symbol && valute === currency) {
          ws.unsubscribe(wsOnMessage);

          return reject();
        }
      }
    };

    ws.send({
      action: 'SubAdd',
      subs: [`${AGGREGATE_INDEX_TYPE}~${EXCHANGE_INDEX}~${symbol}~${currency}`],
    }).subscribe(wsOnMessage);
  });

const removeCoinFromWatch = (symbol: string, currency: string) =>
  new Promise((resolve) => {
    const wsOnMessage = (msg: Message) => {
      if (msg.MESSAGE === UNSUBSCRIBECOMPLETE_MESSAGE) {
        const { coinSymbol, valute } = parseParameter(msg.SUB);

        if (symbol === coinSymbol && valute === currency) {
          ws.unsubscribe(wsOnMessage);
          return resolve({ symbol, currency });
        }
      }

      // if not receiving updates on this subscription.
      if (msg.MESSAGE === SUBSCRIPTION_UNRECOGNIZED_MESSAGE) {
        const { coinSymbol, valute } = parseParameter(msg.PARAMETER);

        if (symbol === coinSymbol && valute === currency) {
          ws.unsubscribe(wsOnMessage);
          return resolve({ symbol, currency });
        }
      }
    };

    ws.send({
      action: 'SubRemove',
      subs: [`${AGGREGATE_INDEX_TYPE}~${EXCHANGE_INDEX}~${symbol}~${currency}`],
    }).subscribe(wsOnMessage);
  });

export { onMessage, addCoinToWatch, removeCoinFromWatch };
