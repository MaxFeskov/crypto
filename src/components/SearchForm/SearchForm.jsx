/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoin } from '../../reducers/coins';

import addIcon from '../../images/icons/add.svg';
import SearchHelper from '../SearchHelper/SearchHelper';

const SearchForm = () => {
  const coinInpitRef = useRef();
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');

  const onAddCount = (coinSymbol) => {
    dispatch(addCoin(coinSymbol));
  };

  const onAddCoinHandler = (event) => {
    event.preventDefault();
    onAddCount(coinInpitRef.current.value);
    coinInpitRef.current.value = '';
    setSearchString('');
  };

  const onChangeSearchStateHandler = () => {
    setSearchString(coinInpitRef.current.value);
  };

  const onHelperClickHandler = (helper) => {
    onAddCount(helper);
  };

  return (
    <form onSubmit={onAddCoinHandler}>
      <div className="flex">
        <div className="max-w-xs">
          <label htmlFor="wallet" className="block text-sm font-medium text-gray-700">
            Тикер
          </label>
          <div className="mt-1 relative rounded-md shadow-md">
            <input
              ref={coinInpitRef}
              onChange={onChangeSearchStateHandler}
              type="text"
              name="wallet"
              id="wallet"
              autoComplete="off"
              className="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Например DOGE"
            />
          </div>
          <SearchHelper searchString={searchString} onClick={onHelperClickHandler} />
        </div>
      </div>
      <button
        onClick={onAddCoinHandler}
        type="button"
        className="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <img src={addIcon} alt="Добавить" className="-ml-0.5 mr-2 h-6 w-6" />
        Добавить
      </button>
    </form>
  );
};

export default SearchForm;
