import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkDetail from '../components/DrinkDetail';
import MealDetail from '../components/MealDetail';

function RecipeDetails() {
  const { pathname } = useLocation();
  return (
    <div>
      { pathname.includes('/meals')
        ? <MealDetail pathname={ pathname } />
        : <DrinkDetail pathname={ pathname } />}
    </div>
  );
}

export default RecipeDetails;
