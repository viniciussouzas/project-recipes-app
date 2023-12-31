import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import Provider from '../contexts/MyProvider';

describe('Testa o componente Footer', () => {
  test('testa se o botão leva para "/meals"', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    const buttonMeals = screen.getByRole('button', {
      name: /mealicon/i,
    });

    userEvent.click(buttonMeals);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
  test('testa se o botão leva para "/drinks"', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );
    const buttonDrinks = screen.getByRole('button', {
      name: /drinkicon/i,
    });

    userEvent.click(buttonDrinks);

    const { pathname } = history.location;

    expect(pathname).toBe('/drinks');
  });
});
