import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Recommendations from './Recommendations';
import context from '../contexts/MyContext';

function MealDetails() {
  const { id } = useParams(); // Hoock usado para pegar o ID que está na URL exemplo e logo em seguida fazer o fetch usando o mesmo

  const [recipeArrayMeal, setRecipeArrayMeal] = useState([]);
  const [recipeObjectMeal, setRecipeObjectMeal] = useState({});
  const { dataDrinks } = useContext(context);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      console.log(data.meals);
      setRecipeArrayMeal([...data.meals]);
      setRecipeObjectMeal(...data.meals);
    };
    fetchApi();
  }, [id]);

  const objectEntries = Object.entries(recipeObjectMeal);

  const getIngredients = objectEntries
    .filter((ingredient) => ingredient[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== null);

  const getMeasures = objectEntries
    .filter((measure) => measure[0].includes('strMeasure'))
    .filter((measure) => measure[1] !== ' ');

  return (
    <div>
      { recipeArrayMeal
        .map(
          ({
            idMeal, strMeal, strCategory, strInstructions, strMealThumb, strYoutube,
          }) => (
            <div key={ idMeal }>
              <h3 data-testid="recipe-title">
                {strMeal}
              </h3>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid="recipe-photo"
              />
              <p data-testid="recipe-category">
                {strCategory}
              </p>
              <p data-testid="instructions">
                {strInstructions}
              </p>
              <iframe
                title={ `Receita: ${strMeal}` }
                width="560"
                height="315"
                allow="accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture"
                allowFullScreen
                src={ strYoutube }
                data-testid="video"
              >
                Click me
              </iframe>
            </div>
          ),
        )}
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
              {ingredient[1]}
            </p>
          ))
        }
      </div>
      <button className="start-recipe-btn" data-testid="start-recipe-btn">Start</button>
      <Recommendations data={ dataDrinks } pageTypes="drinks" />
    </div>
  );
}

export default MealDetails;
