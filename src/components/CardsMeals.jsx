import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardsMeals({ data }) {
  const MAX_SIZE = 12;
  return (
    <div>
      {data.slice(0, MAX_SIZE).map((recipe, index) => (
        <Link to={ `/meals/${recipe.idMeal}` } key={ recipe.idMeal }>
          <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>
              { recipe.strMeal }
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

CardsMeals.propTypes = {
  data: PropTypes.arrayOf(),
}.isRequired;

export default CardsMeals;
