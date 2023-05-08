import React, { useContext } from 'react';
import context from '../contexts/MyContext';

function CardsDrinks() {
  const { filterData } = useContext(context);
  const MAX_SIZE = 12;
  return (
    <div>
      {filterData.slice(0, MAX_SIZE).map((recipe, index) => (
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

export default CardsDrinks;
