/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import addIcon from './images/icons/add.svg';
import deleteIcon from './images/icons/delete.svg';
import cleanIcon from './images/icons/clean.svg';

function App() {
  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
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

        <hr className="w-full border-t border-gray-600 my-4" />
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer">
            <div className="px-4 py-5 sm:p-6 text-center">
              <dt className="text-sm font-medium text-gray-500 truncate">WTF - USD</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">1.11</dd>
            </div>
            <div className="w-full border-t border-gray-200" />
            <button
              type="button"
              className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <img src={deleteIcon} alt="Удалить" className="h-5 w-5" />
              Удалить
            </button>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid border-4 cursor-pointer">
            <div className="px-4 py-5 sm:p-6 text-center">
              <dt className="text-sm font-medium text-gray-500 truncate">VUE - RUB</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">80000.00</dd>
            </div>
            <div className="w-full border-t border-gray-200" />
            <button
              type="button"
              className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <img src={deleteIcon} alt="Удалить" className="h-5 w-5" />
              Удалить
            </button>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer">
            <div className="px-4 py-5 sm:p-6 text-center">
              <dt className="text-sm font-medium text-gray-500 truncate">BTC - USD</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">99999.99</dd>
            </div>
            <div className="w-full border-t border-gray-200" />
            <button
              type="button"
              className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <img src={deleteIcon} alt="Удалить" className="h-5 w-5" />
              Удалить
            </button>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer">
            <div className="px-4 py-5 sm:p-6 text-center">
              <dt className="text-sm font-medium text-gray-500 truncate">DOGE - USD</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">0.0014</dd>
            </div>
            <div className="w-full border-t border-gray-200" />
            <button
              type="button"
              className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
            >
              <img src={deleteIcon} alt="Удалить" className="h-5 w-5" />
              Удалить
            </button>
          </div>
        </dl>
        <hr className="w-full border-t border-gray-600 my-4" />
        <section className="relative">
          <h3 className="text-lg leading-6 font-medium text-gray-900 my-8">VUE - USD</h3>
          <div className="flex items-end border-gray-600 border-b border-l h-64">
            <div className="bg-purple-800 border w-10 h-24" />
            <div className="bg-purple-800 border w-10 h-32" />
            <div className="bg-purple-800 border w-10 h-48" />
            <div className="bg-purple-800 border w-10 h-16" />
          </div>
          <button type="button" className="absolute top-0 right-0">
            <img src={cleanIcon} alt="Очистить" width="30" height="30" />
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
