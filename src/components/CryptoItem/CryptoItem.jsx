import React from 'react';
import PropTypes from 'prop-types';

import deleteIcon from '../../images/icons/delete.svg';

const printPrice = (price) => (!Number(price) ? '-' : price);

const CryptoItem = ({ cid, price, onDelete }) => {
  const [symbol, currency] = cid.split(':');

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer">
      <div className="px-4 py-5 sm:p-6 text-center">
        <dt className="text-sm font-medium text-gray-500 truncate">
          {symbol} - {currency}
        </dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{printPrice(price)}</dd>
      </div>
      <div className="w-full border-t border-gray-200" />
      <button
        onClick={() => onDelete(symbol, currency)}
        type="button"
        className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
      >
        <img src={deleteIcon} alt="Удалить" className="h-5 w-5" />
        Удалить
      </button>
    </div>
  );
};

CryptoItem.propTypes = {
  cid: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CryptoItem;
