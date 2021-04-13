import React from 'react';
import PropTypes from 'prop-types';

const SearchHelperItem = ({ helper, onClick }) => {
  const onClickHandler = (event) => {
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

SearchHelperItem.propTypes = {
  helper: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchHelperItem;
