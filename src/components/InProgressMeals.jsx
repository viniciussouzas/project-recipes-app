import copy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { fetchApiMeals } from '../service/APIs';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './InProgress.css';

function InProgressMeals(props) {
  const idProps = props;
  const { id } = idProps;
  const [filterMeals, setFilterMeals] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [listChecked, setListChecked] = useState([]);
  const [clipboard, setClipboard] = useState('');
  const [favorite, setFavorite] = useState(false);

  const getLocalStorage = () => {
    const arrayLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || [];

    setListChecked(arrayLocalStorage);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const api = await fetchApiMeals(id);
      const filteredApi = api.filter((meal) => meal.idMeal === id);
      setFilterMeals([...filteredApi]);
      setFilterObject(...filteredApi);
    };
    fetchApi();
    getLocalStorage();
  }, [setFilterMeals, id]);

  const objectEntries = Object.entries(filterObject);

  const getIngredients = objectEntries
    .filter((ingredient) => ingredient[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== null && ingredient[1] !== '');

  const handleChange = ({ target }) => {
    const verify = listChecked.some((ingredient) => ingredient === target.value);
    if (verify) {
      const arrayLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));

      const filteredStorage = arrayLocalStorage
        .filter((ingredient) => ingredient !== target.value);

      localStorage.setItem('inProgressRecipes', JSON.stringify(filteredStorage));

      target.parentElement.className = '';

      const filteredList = listChecked
        .filter((ingredient) => ingredient !== target.value);

      setListChecked(filteredList);
    } else {
      const arrayLocalStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes')) || [];

      arrayLocalStorage.push(target.value);

      localStorage.setItem('inProgressRecipes', JSON.stringify(arrayLocalStorage));

      target.parentElement.className = 'ingredients';

      setListChecked([...listChecked, target.value]);
    }
  };

  const isChecked = (ingredient) => listChecked.some((item) => item === ingredient);

  const clipboardClick = () => {
    copy(`http://localhost:3000/meals/${id}`);
    setClipboard('Link copied!');
  };

  const FavoriteButton = () => {
    setFavorite(!favorite);
    const arrayLocalStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes')) || [];

    // arrayLocalStorage.push(
    // [{
    //   id: id,
    //   type: 'meals',
    //   nationality:,
    //   category:,
    //   alcoholicOrNot:,
    //   name:,
    //   image: }],
    // );

    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayLocalStorage));
  };

  return (
    <div>
      {filterMeals.map((element, index) => (
        <section key={ index }>
          <img
            data-testid="recipe-photo"
            src={ element.strMealThumb }
            alt={ element.strArea }
          />
          <h1 data-testid="recipe-title">{element.strArea}</h1>
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
      >
        Finalizar

      </button>
    </div>
  );
}

export default InProgressMeals;
