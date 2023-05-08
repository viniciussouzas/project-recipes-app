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
