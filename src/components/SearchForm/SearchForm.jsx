/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import addIcon from '../../images/icons/add.svg';

function SearchForm() {
  return (
    <section>
      <div className="flex">
        <div className="max-w-xs">
          <label htmlFor="wallet" className="block text-sm font-medium text-gray-700">
            Тикер
          </label>
          <div className="mt-1 relative rounded-md shadow-md">
            <input
              type="text"
              name="wallet"
              id="wallet"
              className="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Например DOGE"
            />
          </div>
          <div className="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
            <span className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              BTC
            </span>
            <span className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              DOGE
            </span>
            <span className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              BCH
            </span>
            <span className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              CHD
            </span>
          </div>
          <div className="text-sm text-red-600">Такой тикер уже добавлен</div>
        </div>
      </div>
      <button
        type="button"
        className="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <img src={addIcon} alt="Добавить" className="-ml-0.5 mr-2 h-6 w-6" />
        Добавить
      </button>
    </section>
  );
}

export default SearchForm;
