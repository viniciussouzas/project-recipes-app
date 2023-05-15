import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardsMeals({ data }) {
  const MAX_SIZE = 12;
  return (
    <div className="cards-container">
      {data.slice(0, MAX_SIZE).map((recipe, index) => (
        <div
          className="card-recipe"
          key={ recipe.idMeal }
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ `/meals/${recipe.idMeal}` } key={ recipe.idMeal }>
            <img
              className="zoom img-card-recipe"
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
            <p id="margin" data-testid={ `${index}-card-name` }>
              { recipe.strMeal }
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

CardsMeals.propTypes = {
  data: PropTypes.arrayOf(),
}.isRequired;

export default CardsMeals;
