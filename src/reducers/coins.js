const ADD_COIN = 'ADD_COIN';
const DELETE_COIN = 'DELETE_COIN';
const UPDATE_COIN = 'UPDATE_COIN';
const DEFAULT_CURRENCY = 'USD';

const initialState = [];

export const addCoin = (coinSymbol) => async (dispatch, getState, api) => {
  const availableCoins = await api.getAvailableCoins();

  if (availableCoins.includes(coinSymbol)) {
    const coin = { symbol: coinSymbol, currency: DEFAULT_CURRENCY, price: 0 };

    api.subscribeToUpdateCoin(coin, (price) => {
      dispatch({ type: UPDATE_COIN, payload: { ...coin, price } });
    });

    dispatch({ type: ADD_COIN, payload: coin });
  }
};

export const deleteCoin = (coin) => async (dispatch, getState, api) => {
  api.unsubscribeToUpdateCoin(coin);

  dispatch({ type: DELETE_COIN, payload: coin });
};

export default function coins(state = initialState, { type, payload }) {
  if (type === ADD_COIN) {
    if (state.some((item) => item.symbol === payload.symbol)) throw new Error('Coin already added');

    return [...state, payload];
  }

  if (type === UPDATE_COIN) {
    const newState = state.slice(0);
    const index = state.findIndex((item) => item.symbol === payload.symbol);
    newState.splice(index, 1, payload);

    return newState;
  }

  if (type === DELETE_COIN) {
    return state.filter((coin) => coin.symbol !== payload.symbol);
  }

  return state;
}
