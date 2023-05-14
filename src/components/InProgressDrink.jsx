import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApiDrinks } from '../service/APIs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './InProgress.css';

function InProgressDrinks(props) {
  const idProps = props;
  const { id } = idProps;
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [listChecked, setListChecked] = useState([]);
  const [clipboard, setClipboard] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  // const receita = { id, type, nationality, category, alcoholicOrNot, name, image };

  useEffect(() => {
    const fetchApi = async () => {
      const api = await fetchApiDrinks(id);
      const filteredApi = api.filter((drink) => drink.idDrink === id);
      setFilterDrinks([...filteredApi]);
      setFilterObject(...filteredApi);
    };
    fetchApi();
    const arrayLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];

    const favoriteTrue = arrayLocalStorage.some((drink) => drink.id === id);

    if (favoriteTrue) {
      setFavorite(true);
    }
  }, [setFilterDrinks, id, setFavorite]);

  const objectEntries = Object.entries(filterObject);

  const getIngredients = objectEntries
    .filter((ingredient) => ingredient[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== null && ingredient[1] !== '');

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes && inProgressRecipes.drinks && inProgressRecipes.drinks[id]) {
      const listCheckedFromLocalStorage = inProgressRecipes.drinks[id] || [];
      setListChecked(listCheckedFromLocalStorage);
    }
  }, [id]);

  const handleChange = ({ target }) => {
    target.parentElement.className = 'ingredients';
    const verify = listChecked.some((e) => e === target.value);
    if (!verify) {
      setListChecked([...listChecked, target.value]);
    } else {
      const filtered = listChecked.filter((e) => e !== target.value);
      setListChecked(filtered);
    }
  };

  useEffect(() => {
    const dataProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {} };
    const object = {
      ...dataProgress,
      drinks: {
        ...dataProgress.drinks,
        [id]: listChecked,
      } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    const ingredientsFinish = objectEntries
      .filter((ingredient) => ingredient[0].includes('strIngredient'))
      .filter((ingredient) => ingredient[1] !== null && ingredient[1] !== '');
    if (ingredientsFinish.length === listChecked.length) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [listChecked, id, objectEntries]);

  const isChecked = (ingredient) => listChecked.some((item) => item === ingredient);

  const clipboardClick = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setClipboard('Link copied!');
  };

  const FavoriteButton = () => {
    if (favorite) {
      const arrayLocalStorage = JSON
        .parse(localStorage.getItem('favoriteRecipes')) || [];

      const arrayFiltered = arrayLocalStorage
        .filter((drink) => drink.id !== id);

      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFiltered));
    } else {
      const arrayLocalStorage = JSON
        .parse(localStorage.getItem('favoriteRecipes')) || [];

      arrayLocalStorage.push(
        {
          id,
          type: 'drink',
          nationality: filterObject.strArea || '',
          category: filterObject.strCategory || '',
          alcoholicOrNot: filterObject.strAlcoholic || '',
          name: filterObject.strDrink,
          image: filterObject.strDrinkThumb,
        },
      );

      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayLocalStorage));
    }

    setFavorite(!favorite);
  };

  const finishButton = () => {
    const dataHoraClique = new Date();
    const arrayLocalStorage = JSON
      .parse(localStorage.getItem('doneRecipes')) || [];

    arrayLocalStorage.push(
      {
        id,
        type: 'drink',
        nationality: filterObject.strArea || '',
        category: filterObject.strCategory || '',
        alcoholicOrNot: filterObject.strAlcoholic || '',
        name: filterObject.strDrink,
        image: filterObject.strDrinkThumb,
        doneDate: dataHoraClique,
        tags: filterObject.strTags || [],
      },
    );

    localStorage.setItem('doneRecipes', JSON.stringify(arrayLocalStorage));
    history.push('/done-recipes');
  };

  return (
    <div>
      {filterDrinks.map((element, index) => (
        <section key={ index }>
          <img
            data-testid="recipe-photo"
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
          />
          <h1 data-testid="recipe-title">{element.strDrink}</h1>
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
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ FavoriteButton }
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt={ favorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
            />
          </button>
          <p>{ clipboard }</p>
          <p data-testid="recipe-category">{element.strCategory}</p>
          <h3>Instrução</h3>
          <p data-testid="instructions">
            {element.strInstructions}
          </p>
        </section>
      ))}
      {
        getIngredients.map((ingredient, index) => (
          <label
            key={ index }
            htmlFor={ ingredient[1] }
            data-testid={ `${index}-ingredient-step` }
            className={ isChecked(`${ingredient[1]}`) ? 'ingredients' : '' }
          >
            <input
              id={ ingredient[1] }
              checked={ isChecked(ingredient[1]) }
              type="checkbox"
              onChange={ handleChange }
              value={ ingredient[1] }
            />
            {ingredient[1]}
          </label>
        ))
      }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disable }
        onClick={ finishButton }
      >
        Finalizar

      </button>
    </div>
  );
}

export default InProgressDrinks;
