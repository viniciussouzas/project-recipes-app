import React from 'react';
import Header from '../components/Header';
import CardFavoriteRecipes from '../components/CardFavoriteRecipes';

function FavoritesRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" searchIcon={ false } />
      <CardFavoriteRecipes />
    </div>
  );
}

export default FavoritesRecipes;
