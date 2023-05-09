import React from 'react';
import PropTypes from 'prop-types';

function CardsDrinks({ data }) {
  const MAX_SIZE = 12;
  return (
    <div>
      {data.slice(0, MAX_SIZE).map((recipe, index) => (
        <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
          />
          <p data-testid={ `${index}-card-name` }>
            { recipe.strDrink }
          </p>
        </div>
      ))}
    </div>
  );
}
CardsDrinks.propTypes = {
  data: PropTypes.arrayOf(),
}.isRequired;

export default CardsDrinks;
