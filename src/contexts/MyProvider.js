import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [inputApi, setInputApi] = useState('');
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const fetchCategoryMeals = async () => {
    try {
      const urlApi = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(urlApi);
      const result = await response.json();
      const filtredResult = result.meals.map((element) => element.strCategory);
      setCategoryMeals(filtredResult);
    } catch {
      return null;
    }
  };

  const fetchCategoryDrinks = async () => {
    try {
      const urlApi = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(urlApi);
      const result = await response.json();
      const filtredResult = result.drinks.map((element) => element.strCategory);
      setCategoryDrinks(filtredResult);
    } catch {
      return null;
    }
  };

  const fetchApiMeals = async () => {
    try {
      const urlApi = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(urlApi);
      const result = await response.json();
      setDataMeals(result.meals);
    } catch {
      return null;
    }
  };

  const fetchApiDrinks = async () => {
    try {
      const urlApi = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(urlApi);
      const result = await response.json();
      setDataDrinks(result.drinks);
    } catch {
      return null;
    }
  };
  useEffect(() => {
    fetchApiMeals();
    fetchApiDrinks();
    fetchCategoryMeals();
    fetchCategoryDrinks();
  }, []);
  const values = useMemo(() => ({
    inputApi,
    setInputApi,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    categoryMeals,
    setCategoryMeals,
    categoryDrinks,
    setCategoryDrinks,
    filterData,
    setFilterData,
  }), [
    inputApi,
    setInputApi,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    categoryMeals,
    setCategoryMeals,
    categoryDrinks,
    setCategoryDrinks,
    filterData,
    setFilterData,
  ]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
