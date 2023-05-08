import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/Drinks';
import Provider from '../contexts/MyProvider';

describe('Testa página Drinks', () => {
  test('', () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
  });
});
