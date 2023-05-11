import React from 'react';
import PropTypes from 'prop-types';
import CardsDrinks from './CardsDrinks';
import CardsMeals from './CardsMeals';

function Recipes({ data, pageTypes }) {
  return (
    <div>
      {
        pageTypes === 'meals'
          ? <CardsMeals data={ data } />
          : <CardsDrinks data={ data } />
      }
    </div>
  );
}

Recipes.propTypes = {
  data: PropTypes.arrayOf({}),
  pageTypes: PropTypes.string,
}.isRequired;

export default Recipes;
