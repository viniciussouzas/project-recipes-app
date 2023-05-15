import React, { useEffect, useState, useContext } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Recommendations from './Recommendations';
import shareIcon from '../images/shareIcon.svg';
import context from '../contexts/MyContext';
import './Footer.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkDetail({ pathname }) {
  const { id } = useParams(); // Hook usado para pegar o ID que está na URL exemplo e logo em seguida fazer o fetch usando o mesmo
  const history = useHistory();

  const [recipeArrayDrink, setRecipeArrayDrink] = useState([]);
  const [recipeObjectDrink, setRecipeObjectDrink] = useState({});
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verifyIsFavorite, setVerifyIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]); /* Array onde irei guardar meus favoritos */
  const { dataMeals } = useContext(context);
  const [clipboard, setClipboard] = useState('');

  const clipboardClick = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setClipboard('Link copied!');
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipeArrayDrink([...data.drinks]);
      setRecipeObjectDrink(...data.drinks);
    };
    fetchApi();
  }, [id]);

  useEffect(() => {
    const getIdDoneRecipe = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || {};

    if (!Object.keys(getIdDoneRecipe).includes('drinks')) {
      setVerifyInProgress(false);
    } else {
      setVerifyInProgress(Object.keys(getIdDoneRecipe.drinks).includes(id));
    }
  }, []);

  const objectEntries = Object.entries(recipeObjectDrink);

  const getIngredients = objectEntries
    .filter((ingredient) => ingredient[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== null);

  const getMeasures = objectEntries
    .filter((measure) => measure[0].includes('strMeasure'))
    .filter((measure) => measure[1] !== ' ');

  useEffect(() => {
    const getFavoritesFromLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(getFavoritesFromLocalStorage);

    const checkedIsFavorite = getFavoritesFromLocalStorage
      .some((recipe) => recipe.id === id);
    setVerifyIsFavorite(checkedIsFavorite);
  }, [id]);

  const handleClick = () => {
    if (verifyIsFavorite) {
      const updateFavorites = favorites.filter((recipe) => recipe.id !== id);
      setFavorites(updateFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorites));
      setVerifyIsFavorite(false);
    } else {
      const setFavoritesLocalStorage = [...favorites, {
        id: recipeObjectDrink.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeObjectDrink.strCategory,
        alcoholicOrNot: recipeObjectDrink.strAlcoholic,
        name: recipeObjectDrink.strDrink,
        image: recipeObjectDrink.strDrinkThumb,
      }];
      setFavorites(setFavoritesLocalStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(setFavoritesLocalStorage));
      setVerifyIsFavorite(true);
    }
  };
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
            <button
              type="button"
              data-testid="share-btn"
              onClick={ clipboardClick }
            >
              <img
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
            <p>{ clipboard }</p>
            <p data-testid="instructions">
              {strInstructions}
            </p>
            <button
              onClick={ handleClick }
              type="button"
              data-testid="favorite-btn"
              src={ verifyIsFavorite ? blackHeartIcon : whiteHeartIcon }
            >
              <img
                src={ verifyIsFavorite ? blackHeartIcon : whiteHeartIcon }
                alt={ verifyIsFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
              />
            </button>
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

DrinkDetail.propTypes = {
  pathname: PropTypes.func,
}.isRequired;

export default DrinkDetail;
