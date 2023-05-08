import React, { useContext } from 'react';
import context from '../contexts/MyContext';

function CardsMeals() {
  const { filterData } = useContext(context);
  const MAX_SIZE = 12;
  return (
    <div>
      {filterData.slice(0, MAX_SIZE).map((recipe, index) => (
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
      ))}
    </div>
  );
}

export default CardsMeals;
