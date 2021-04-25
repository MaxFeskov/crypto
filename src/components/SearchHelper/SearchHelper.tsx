import React, { useEffect, useState } from 'react';
import { AvailableCoinSymbols, searchCoins } from '../../services/api';
import SearchHelperItem from '../SearchHelperItem/SearchHelperItem';

interface SearchHelperProps {
  searchString: string;
  onClick: (helper: string) => void;
}

const SearchHelper = ({ searchString, onClick }: SearchHelperProps) => {
  const [searchHelpers, setSearchHelpers] = useState<AvailableCoinSymbols>([]);

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

export default SearchHelper;
