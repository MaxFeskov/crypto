import { getAvailableCoins, subscribeToUpdateCoin, unsubscribeToUpdateCoin } from './services/api';

const api = {
  getAvailableCoins,
  subscribeToUpdateCoin,
  unsubscribeToUpdateCoin,
};

export default api;
