import React from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';

function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" searchIcon={ false } />
      <CardDoneRecipes />
    </div>
  );
}

export default DoneRecipes;
