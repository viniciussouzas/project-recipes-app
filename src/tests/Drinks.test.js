import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/Drinks';
import Provider from '../contexts/MyProvider';
import mockDrinksName from '../helpers/MockDrinksName';

describe('Testa página Drinks', () => {
  test('', () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockDrinksName),
    });
  });
});
