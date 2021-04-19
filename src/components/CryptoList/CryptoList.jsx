import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoin } from '../../reducers/coins';

import CryptoItem from '../CryptoItem/CryptoItem';
import CryptoItemDiagram from '../CryptoItemDiagram/CryptoItemDiagram';
import Hr from '../Hr/Hr';
import SearchForm from '../SearchForm/SearchForm';

const CryptoList = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const coins = useSelector((state) => state.coins);
  const dispatch = useDispatch();

  const deleteCoinHandler = (cid) => {
    if (cid === selectedCoin) setSelectedCoin('');

    const [symbol, currency] = cid.split(':');
    dispatch(deleteCoin(symbol, currency));
  };

  const itemSelelctHandler = (cid) => {
    setSelectedCoin(cid);
  };

  return (
    <>
      <SearchForm />

      {coins.length ? <Hr /> : null}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {Array.from(coins).map(([id, price]) => (
          <CryptoItem
            cid={id}
            price={price}
            isSelected={Boolean(id === selectedCoin)}
            onSelect={itemSelelctHandler}
            onDelete={deleteCoinHandler}
            key={id}
          />
        ))}
      </div>

      <CryptoItemDiagram cid={selectedCoin} />
    </>
  );
};

export default CryptoList;
