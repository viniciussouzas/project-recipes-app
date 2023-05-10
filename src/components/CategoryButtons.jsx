import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { filterCategory } from '../service/APIs';
import context from '../contexts/MyContext';

function CategoryButtons({ data }) {
  const {
    setFilterData,
    toggle, setToggle,
    selectedCategory, setSelectedCategory,
  } = useContext(context);
  const MAX_SIZE = 5;
  const { pathname } = useLocation();

  const handleButton = async ({ target: { value } }) => {
    if (selectedCategory === value && toggle) {
      setFilterData([]);
      setToggle(false);
    } else {
      setFilterData(await filterCategory(value, pathname));
      setSelectedCategory(value);
      setToggle(true);
    }
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
