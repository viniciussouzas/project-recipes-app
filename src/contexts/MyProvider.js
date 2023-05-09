import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [inputApi, setInputApi] = useState('');
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [filterData, setFilterData] = useState([]);

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
  }, []);
  const values = useMemo(() => ({
    inputApi,
    setInputApi,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    filterData,
    setFilterData,
  }), [
    inputApi,
    setInputApi,
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
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
