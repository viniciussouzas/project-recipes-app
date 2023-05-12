export const mealsIngredients = async (ingrediente) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data.meals;
};

export const mealsNames = async (nome) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data.meals;
};

export const mealsFirstLetter = async (primeiraLetra) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data.meals;
};

export const drinkIngredients = async (ingrediente) => {
  try {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
    const response = await fetch(urlApi);
    const data = await response.json();
    return data.drinks;
  } catch {
    return null;
  }
};

export const drinkNames = async (nome) => {
  try {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
    const response = await fetch(urlApi);
    const data = await response.json();
    return data.drinks;
  } catch {
    return null;
  }
};

export const drinkFirstLetter = async (primeiraLetra) => {
  try {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
    const response = await fetch(urlApi);
    const data = await response.json();
    return data.drinks;
  } catch {
    return null;
  }
};

export const filterCategory = async (category, pathName) => {
  try {
    if (pathName === '/meals') {
      const urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(urlApi);
      const data = await response.json();
      return data.meals;
    }
    if (pathName === '/drinks') {
      const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(urlApi);
      const data = await response.json();
      return data.drinks;
    }
  } catch {
    return null;
  }
};

export const fetchApiMeals = async (id) => {
  try {
    const urlApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(urlApi);
    const data = await response.json();
    return data.meals;
  } catch {
    return null;
  }
};

export const fetchApiDrinks = async (id) => {
  try {
    const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(urlApi);
    const data = await response.json();
    return data.drinks;
  } catch {
    return null;
  }
};

// export const setLocalStorage = (key, value) => {
//   const stringify = JSON.stringify(value);
//   localStorage.setItem(key, stringify);
// };

// export const getLocalStorage = (key) => {
//   const value = localStorage.getItem(key);
//   const dataValue = JSON.parse(value);
//   return dataValue;
// };
