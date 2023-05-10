import React from 'react';

function InProgressMeals() {
  return (
    <div>
      <img data-testid="recipe-photo" alt="" />
      <h1 data-testid="recipe-title">Meals</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        favoritar
      </button>
      <p data-testid="recipe-category">categoria</p>
      <h3 data-testid="instructions">Instrução</h3>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar

      </button>
    </div>
  );
}

export default InProgressMeals;
