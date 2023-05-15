import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardsDrinks({ data }) {
  const MAX_SIZE = 12;
  return (
    <div className="cards-container">
      {data.slice(0, MAX_SIZE).map((recipe, index) => (
        <div
          className="card-recipe"
          key={ recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <Link to={ `/drinks/${recipe.idDrink}` } key={ recipe.idDrink }>
            <img
              className="zoom img-card-recipe"
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
            <p id="margin" data-testid={ `${index}-card-name` }>
              { recipe.strDrink }
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
CardsDrinks.propTypes = {
  data: PropTypes.arrayOf(),
}.isRequired;

export default CardsDrinks;
