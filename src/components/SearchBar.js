import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import context from '../contexts/MyContext';
import { mealsIngredients, mealsNames, mealsFirstLetter,
  drinkIngredients, drinkNames, drinkFirstLetter } from '../service/APIs';

function SearchBar() {
  const { inputApi, setFilterData } = useContext(context);
  const { pathname } = useLocation();
  const [radio, setRadio] = useState('');

  const history = useHistory();

  const handleChange = ({ target: { value } }) => {
    setRadio(value);
  };

  const recipeNotFound = (recipe) => {
    if (recipe === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const verifyData = (param) => {
    if (param?.length === 1 && pathname === '/meals') {
      history.push(`/meals/${param[0].idMeal}`);
    } if (param?.length === 1 && pathname === '/drinks') {
      history.push(`/drinks/${param[0].idDrink}`);
    }
  };

  const getMealsApi = async () => {
    if (radio === 'ingredient') {
      const filterIngredients = await mealsIngredients(inputApi);
      recipeNotFound(filterIngredients);
      setFilterData(filterIngredients || []);
      verifyData(filterIngredients);
    }
    if (radio === 'name') {
      const filterName = await mealsNames(inputApi);
      recipeNotFound(filterName);
      setFilterData(filterName || []);
      verifyData(filterName);
    }
    if (radio === 'first-letter') {
      if (inputApi.length === 1) {
        const filterLetter = await mealsFirstLetter(inputApi);
        recipeNotFound(filterLetter);
        setFilterData(filterLetter || []);
        verifyData(filterLetter);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const getDrinksApi = async () => {
    if (radio === 'ingredient') {
      const filterIngredients = await drinkIngredients(inputApi);
      recipeNotFound(filterIngredients);
      setFilterData(filterIngredients || []);
      verifyData(filterIngredients);
    }
    if (radio === 'name') {
      const filterName = await drinkNames(inputApi);
      recipeNotFound(filterName);
      setFilterData(filterName || []);
      verifyData(filterName);
    }
    if (radio === 'first-letter') {
      if (inputApi.length === 1) {
        const filterLetter = await drinkFirstLetter(inputApi);
        recipeNotFound(filterLetter);
        setFilterData(filterLetter || []);
        verifyData(filterLetter);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
  };

  const handleClick = async () => {
    setFilterData([]);
    if (pathname === '/meals') {
      await getMealsApi();
    }
    if (pathname === '/drinks') {
      await getDrinksApi();
    }
  };

  return (
    <nav>
      <div
        onChange={ handleChange }
      >
        <label>
          <input
            name="filter"
            type="radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
          />
          Ingredient
        </label>
        <label>
          <input
            name="filter"
            type="radio"
            data-testid="name-search-radio"
            value="name"
          />
          Name
        </label>
        <label>
          <input
            name="filter"
            type="radio"
            data-testid="first-letter-search-radio"
            value="first-letter"
          />
          First letter
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search

      </button>
    </nav>
  );
}

export default SearchBar;
