import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { filterCategory } from '../service/APIs';
import context from '../contexts/MyContext';

function CategoryButtons({ data }) {
  const {
    setFilterData,
    setToggle,
    selectedCategory, setSelectedCategory,
  } = useContext(context);
  const MAX_SIZE = 5;
  const { pathname } = useLocation();

  const handleButton = async ({ target: { value } }) => {
    setToggle(true);
    if (selectedCategory === value) {
      setToggle(false);
    }
    setSelectedCategory(value);
    setFilterData(await filterCategory(value, pathname));
  };

  const clearFilterData = () => {
    setFilterData([]);
  };

  return (
    <div>
      {data.slice(0, MAX_SIZE).map((categoryName) => (
        <div key={ categoryName }>
          <button
            data-testid={ `${categoryName}-category-filter` }
            value={ categoryName }
            onClick={ handleButton }
          >
            {categoryName}
          </button>
        </div>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ clearFilterData }
      >
        All
      </button>
    </div>
  );
}

CategoryButtons.propTypes = {
  data: PropTypes.arrayOf(),
}.isRequired;

export default CategoryButtons;
