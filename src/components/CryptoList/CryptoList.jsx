import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoin } from '../../reducers/coins';

import CryptoItem from '../CryptoItem/CryptoItem';
import Hr from '../Hr/Hr';

const CryptoList = () => {
  const coins = useSelector((state) => state.coins);
  const dispatch = useDispatch();

  const deleteCoinHandler = (symbol, currency) => {
    dispatch(deleteCoin(symbol, currency));
  };

  return (
    <>
      {coins.length ? <Hr /> : null}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {Array.from(coins).map(([id, price]) => (
          <CryptoItem cid={id} price={price} onDelete={deleteCoinHandler} key={id} />
        ))}
      </dl>
    </>
  );
};

export default CryptoList;
