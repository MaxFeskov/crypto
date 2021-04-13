import React from 'react';
import PropTypes from 'prop-types';

import deleteIcon from '../../images/icons/delete.svg';

const printPrice = (price) => {
  if (!Number(price)) return '-';

  return price > 1 ? price.toFixed(2) : price.toPrecision(4);
};

const CryptoItem = ({ coin, onDelete }) => (
  <div className="bg-white bg-red-100 overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer">
    <div className="px-4 py-5 sm:p-6 text-center">
      <dt className="text-sm font-medium text-gray-500 truncate">{coin.symbol} - USD</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{printPrice(coin.price)}</dd>
    </div>
    <div className="w-full border-t border-gray-200" />
    <button
      onClick={() => onDelete(coin)}
      type="button"
      className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
    >
      <img src={deleteIcon} alt="Удалить" className="h-5 w-5" />
      Удалить
    </button>
  </div>
);

CryptoItem.propTypes = {
  coin: PropTypes.shape({
    symbol: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CryptoItem;
