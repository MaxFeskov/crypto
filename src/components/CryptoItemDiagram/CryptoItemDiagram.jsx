import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useDiagram from '../../hooks/use-diagram';
import useElementSize from '../../hooks/use-element-size';
import useInterval from '../../hooks/use-interval';

import cleanIcon from '../../images/icons/clean.svg';
import Hr from '../Hr/Hr';

const MIN_PERCENT_VALUE = 10;

const CryptoItemDiagram = ({ cid }) => {
  const diagramRef = useRef();
  const { width } = useElementSize(diagramRef.current);
  const [state, { add, clear, changeMaxCount }] = useDiagram();
  const { items, keys, min, max } = state;

  const [symbol, currency] = cid.split(':');
  const coins = useSelector((store) => store.coins);

  const price = coins.get(cid);

  let k = (100 - MIN_PERCENT_VALUE) / (max - min);
  k = Number.isFinite(k) ? k : 0;

  useEffect(() => {
    clear();
  }, [clear, cid]);

  useEffect(() => {
    changeMaxCount(Math.floor(width / 40) || 1);
  }, [width, changeMaxCount]);

  useInterval(() => {
    if (price) {
      add(price, `${Date.now()}`);
    }
  }, 1000);

  return (
    <>
      {price ? (
        <>
          <Hr />
          <section className="relative">
            <h3 className="text-lg leading-6 font-medium text-gray-900 my-8">
              {symbol} - {currency}
            </h3>
            <div ref={diagramRef} className="flex items-end border-gray-600 border-b border-l h-64">
              {items.map((item, index) => {
                const percentValue = (item - min) * k;
                const { [index]: key } = keys;

                return (
                  <div
                    key={key}
                    className="bg-purple-800 border w-10"
                    style={{ height: `${percentValue + MIN_PERCENT_VALUE}%` }}
                  />
                );
              })}
            </div>
            <button type="button" onClick={clear} className="absolute top-0 right-0">
              <img src={cleanIcon} alt="Очистить" width="30" height="30" />
            </button>
          </section>
        </>
      ) : null}
    </>
  );
};

CryptoItemDiagram.propTypes = {
  cid: PropTypes.string.isRequired,
};

export default CryptoItemDiagram;
