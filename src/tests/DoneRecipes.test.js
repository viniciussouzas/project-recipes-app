import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import Provider from '../contexts/MyProvider';

describe('Testa página DoneRecipes', () => {
  test('', () => {
    renderWithRouter(
      <Provider>
        <DoneRecipes />
      </Provider>,
    );
  });
});
