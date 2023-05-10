import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Recommendations from './Recommendations';
import context from '../contexts/MyContext';

function DrinkDetail() {
  const { id } = useParams(); // Hook usado para pegar o ID que está na URL exemplo e logo em seguida fazer o fetch usando o mesmo
  const [recipeArrayDrink, setRecipeArrayDrink] = useState([]);
  const [recipeObjectDrink, setRecipeObjectDrink] = useState({});
  const { dataMeals } = useContext(context);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      console.log(data.drinks);
      setRecipeArrayDrink([...data.drinks]);
      setRecipeObjectDrink(...data.drinks);
    };
    fetchApi();
  }, [id]);

  const objectEntries = Object.entries(recipeObjectDrink);
  console.log(objectEntries);

  const getIngredients = objectEntries
    .filter((ingredient) => ingredient[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== null);

  const getMeasures = objectEntries
    .filter((measure) => measure[0].includes('strMeasure'))
    .filter((measure) => measure[1] !== ' ');

  return (
    <div>
      { recipeArrayDrink
        .map(({
          idDrink, strDrink, strCategory, strInstructions, strDrinkThumb, strAlcoholic,
        }) => (
          <div key={ idDrink }>
            <h3 data-testid="recipe-title">
              {strDrink}
            </h3>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-category">
              {`${strCategory} ${strAlcoholic}`}
            </p>
            <p data-testid="instructions">
              {strInstructions}
            </p>

          </div>
        ))}
      <div>
        {
          getMeasures.map((measure, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { measure[1] }
            </p>
          ))
        }
        {
          getIngredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient[1] }
            </p>
          ))
        }
      </div>
      <Recommendations data={ dataMeals } pageTypes="meals" />
    </div>
  );
}

export default DrinkDetail;
