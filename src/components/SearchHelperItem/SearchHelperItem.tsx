import React, { SyntheticEvent } from 'react';

interface SearchHelperItemProps {
  helper: string;
  onClick: (helper: string) => void;
}

const SearchHelperItem = ({ helper, onClick }: SearchHelperItemProps) => {
  const onClickHandler = (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onClick(helper);
  };

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
    >
      {helper}
    </button>
  );
};

export default SearchHelperItem;
