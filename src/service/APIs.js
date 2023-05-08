export const mealsIngredients = async (ingrediente) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export const mealsNames = async (nome) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export const mealsFirstLetter = async (primeiraLetra) => {
  const urlApi = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export const drinkIngredients = async (ingrediente) => {
  const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export const drinkNames = async (nome) => {
  const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export const drinkFirstLetter = async (primeiraLetra) => {
  const urlApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};
