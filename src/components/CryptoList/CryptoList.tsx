import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoin } from '../../reducers/coins';
import { RootState } from '../../store';

import CryptoItem from '../CryptoItem/CryptoItem';
import CryptoItemDiagram from '../CryptoItemDiagram/CryptoItemDiagram';
import Hr from '../Hr/Hr';
import SearchForm from '../SearchForm/SearchForm';

const CryptoList: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState('');
  const coins = useSelector((state: RootState) => state.coins);
  const dispatch = useDispatch();

  const deleteCoinHandler = (cid: string) => {
    if (cid === selectedCoin) setSelectedCoin('');

    const [symbol, currency] = cid.split(':');
    dispatch(deleteCoin({ symbol, currency }));
  };

  const itemSelelctHandler = (cid: string) => {
    setSelectedCoin(cid);
  };

  return (
    <>
      <SearchForm />

      {coins.size ? <Hr /> : null}
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

      {selectedCoin ? <CryptoItemDiagram cid={selectedCoin} /> : null}
    </>
  );
};

export default CryptoList;
