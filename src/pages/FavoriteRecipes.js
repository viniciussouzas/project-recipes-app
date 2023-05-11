import React from 'react';
import Header from '../components/Header';

function FavoritesRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" searchIcon={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoritesRecipes;
