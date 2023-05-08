import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Provider from '../contexts/MyProvider';

describe('Testa página FavoriteRecipes', () => {
  test('', () => {
    renderWithRouter(
      <Provider>
        <FavoriteRecipes />
      </Provider>,
    );
  });
});
