import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Recommendations from './Recommendations';
import context from '../contexts/MyContext';
import './Footer.css';

function MealDetails({ pathname }) {
  const { id } = useParams(); // Hook usado para pegar o ID que está na URL exemplo e logo em seguida fazer o fetch usando o mesmo
  const history = useHistory();

  const [recipeArrayMeal, setRecipeArrayMeal] = useState([]);
  const [recipeObjectMeal, setRecipeObjectMeal] = useState({});
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const { dataDrinks } = useContext(context);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeArrayMeal([...data.meals]);
      setRecipeObjectMeal(...data.meals);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const getIdDoneRecipe = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};

    if (!Object.keys(getIdDoneRecipe).includes('meals')) {
      setVerifyInProgress(false);
    } else {
      setVerifyInProgress(Object.keys(getIdDoneRecipe.meals).includes(id));
    }
  }, []);

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
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
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

      <Recommendations data={ dataDrinks } pageTypes="drinks" />

      <button
        type="button"
        className="btn"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${pathname}/in-progress`) }
      >
        {
          verifyInProgress ? 'Continue Recipe' : 'Start Recipe'
        }
      </button>

    </div>
  );
}

MealDetails.propTypes = {
  pathname: PropTypes.func,
}.isRequired;

export default MealDetails;
