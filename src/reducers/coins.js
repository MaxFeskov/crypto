const ADD_COIN = 'ADD_COIN';
const DELETE_COIN = 'DELETE_COIN';
const UPDATE_COIN = 'UPDATE_COIN';
const DEFAULT_CURRENCY = 'USD';

const initialState = new Map();

const roundPrice = (price) => Number(price > 1 ? price.toFixed(2) : price.toPrecision(4));

export const addCoin = (symbol, currency = DEFAULT_CURRENCY) => async (dispatch, getState, api) => {
  const availableCoins = await api.getAvailableCoins();

  if (availableCoins.includes(symbol)) {
    const coin = { symbol, currency, price: 0 };

    api.subscribeToUpdateCoin(coin, (price) => {
      dispatch({ type: UPDATE_COIN, payload: { ...coin, price } });
    });

    dispatch({ type: ADD_COIN, payload: coin });
  }
};

export const deleteCoin = (symbol, currency) => async (dispatch, getState, api) => {
  api.unsubscribeToUpdateCoin({ symbol, currency });

  dispatch({ type: DELETE_COIN, payload: { symbol, currency } });
};

export default function coins(state = initialState, { type, payload }) {
  if (type === ADD_COIN) {
    const { symbol, currency } = payload;
    const id = `${symbol}:${currency}`;
    const price = roundPrice(payload.price);

    if (state.get(id)) throw new Error(`Coin ${id} already added`);

    return new Map(state.set(id, price));
  }

  if (type === UPDATE_COIN) {
    const { symbol, currency } = payload;
    const id = `${symbol}:${currency}`;
    const price = roundPrice(payload.price);

    if (state.get(id) !== price) return new Map(state.set(id, price));
  }

  if (type === DELETE_COIN) {
    const { symbol, currency } = payload;
    const id = `${symbol}:${currency}`;

    if (state.delete(id)) return new Map(state);
  }

  return state;
}
