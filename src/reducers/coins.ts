import { Dispatch } from 'redux';
import {
  getAvailableCoinSymbols,
  subscribeToUpdateCoin,
  unsubscribeToUpdateCoin,
} from '../services/api';

export interface Coin {
  symbol: string;
  currency: string;
}

interface CoinWithPrice extends Coin {
  price: number;
}

type ActionType =
  | { type: 'COIN_ADD'; payload: CoinWithPrice }
  | { type: 'COIN_UPDATE'; payload: CoinWithPrice }
  | { type: 'COIN_DELETE'; payload: Coin };

const initialState = new Map<string, number>();

const roundPrice = (price: number) => Number(price > 1 ? price.toFixed(2) : price.toPrecision(4));

export const addCoin = (coin: Coin) => async (dispatch: Dispatch<ActionType>) => {
  const { symbol, currency } = coin;

  if (symbol && currency) {
    const availableCoins = await getAvailableCoinSymbols();

    if (availableCoins.includes(symbol)) {
      const newCoin = { symbol, currency, price: 0 };

      subscribeToUpdateCoin(newCoin, (price: number) => {
        dispatch({ type: 'COIN_UPDATE', payload: { ...newCoin, price } });
      });

      dispatch({ type: 'COIN_ADD', payload: newCoin });
    }
  }
};

export const deleteCoin = (coin: Coin) => async (dispatch: Dispatch<ActionType>) => {
  const { symbol, currency } = coin;

  if (symbol && currency) {
    unsubscribeToUpdateCoin({ symbol, currency });

    dispatch({ type: 'COIN_DELETE', payload: { symbol, currency } });
  }
};

export default function coins(state = initialState, action: ActionType) {
  if (action.type === 'COIN_ADD') {
    const { symbol, currency } = action.payload;
    const id = `${symbol}:${currency}`;
    const price = roundPrice(action.payload.price);

    if (!state.get(id)) return new Map(state.set(id, price));
  }

  if (action.type === 'COIN_UPDATE') {
    const { symbol, currency } = action.payload;
    const id = `${symbol}:${currency}`;
    const price = roundPrice(action.payload.price);

    if (state.get(id) !== price) return new Map(state.set(id, price));
  }

  if (action.type === 'COIN_DELETE') {
    const { symbol, currency } = action.payload;
    const id = `${symbol}:${currency}`;

    if (state.delete(id)) return new Map(state);
  }

  return state;
}
