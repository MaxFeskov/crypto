import React from 'react';

import CryptoItem from '../CryptoItem/CryptoItem';

function CryptoList() {
  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <CryptoItem />
      <CryptoItem />
      <CryptoItem />
      <CryptoItem />
    </dl>
  );
}

export default CryptoList;
