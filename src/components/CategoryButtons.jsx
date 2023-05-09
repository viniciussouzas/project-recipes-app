import React from 'react';
import PropTypes from 'prop-types';

function CategoryButtons({ data }) {
  const MAX_SIZE = 5;
  return (
    <div>
      {data.slice(0, MAX_SIZE).map((categoryName) => (
        <div key={ categoryName }>
          <button data-testid={ `${categoryName}-category-filter` }>
            {categoryName}
          </button>
        </div>
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  data: PropTypes.arrayOf(),
}.isRequired;

export default CategoryButtons;
