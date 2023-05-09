import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Meals from '../pages/Meals';
import Provider from '../contexts/MyProvider';
import App from '../App';

describe('Testa componente Header', () => {
  test('Verifica se o Title está de acordo com a rota Meals', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => history.push('/meals'));
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    const headerTitle = screen.getByTestId('page-title');
    expect(headerTitle).toHaveTextContent('Meals');
  });
  test('Verifica se o Title está de acordo com a rota Drinks', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => history.push('/drinks'));
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
    const headerTitle = screen.getByTestId('page-title');
    expect(headerTitle).toHaveTextContent('Drinks');
  });

  test('Verifica se botão profile envia para rota "/profile"', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const buttonProfile = screen.getByRole('button', {
      name: /perfil/i,
    });

    userEvent.click(buttonProfile);

    const { pathname } = history.location;

    await waitFor(() => {
      expect(pathname).toBe('/profile');
    });
  });
  test('Verifica se botão search renderiza um input', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const buttonSearch = screen.getByTestId('search-button');

    userEvent.click(buttonSearch);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
});
