import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { searchCoins } from '../../services/api';
import SearchHelperItem from '../SearchHelperItem/SearchHelperItem';

const SearchHelper = ({ searchString, onClick }) => {
  const [searchHelpers, setSearchHelpers] = useState([]);

  useEffect(() => {
    if (searchString.length > 2) {
      searchCoins({ searchString, maxResultsCount: 4 }, (foundCoins) => {
        setSearchHelpers(foundCoins);
      });
    } else {
      setSearchHelpers([]);
    }
  }, [searchString]);

  return (
    <>
      {searchHelpers.length ? (
        <div className="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
          {searchHelpers.map((helper) => (
            <SearchHelperItem key={helper} helper={helper} onClick={onClick} />
          ))}
        </div>
      ) : null}
    </>
  );
};

SearchHelper.propTypes = {
  searchString: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchHelper;
