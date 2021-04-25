/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { RefObject, SyntheticEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoin, Coin } from '../../reducers/coins';

import addIcon from '../../images/icons/add.svg';
import SearchHelper from '../SearchHelper/SearchHelper';

const DEFAULT_CURRENCY = 'USD';

const SearchForm = () => {
  const coinInpitRef: RefObject<HTMLInputElement> = useRef(null);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState('');

  const onAddCount = (coin: Coin) => {
    dispatch(addCoin(coin));
  };

  const onAddCoinHandler = (
    event: SyntheticEvent<HTMLFormElement> | SyntheticEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (coinInpitRef.current) {
      onAddCount({
        symbol: coinInpitRef.current.value,
        currency: DEFAULT_CURRENCY,
      });

      coinInpitRef.current.value = '';
      setSearchString('');
    }
  };

  const onChangeSearchStateHandler = () => {
    if (coinInpitRef.current) {
      setSearchString(coinInpitRef.current.value);
    }
  };

  const onHelperClickHandler = (helper: string) => {
    onAddCount({
      symbol: helper,
      currency: DEFAULT_CURRENCY,
    });
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
