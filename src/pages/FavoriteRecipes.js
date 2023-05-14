import React from 'react';
import Header from '../components/Header';
import CardFavoriteRecipes from '../components/CardFavoriteRecipes';

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
      <CardFavoriteRecipes />
    </div>
  );
}

export default FavoritesRecipes;
