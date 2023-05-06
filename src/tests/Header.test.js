import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Testa componente Header', () => {
  test('Verifica se botão profile envia para rota "/profile"', async () => {
    const { history } = renderWithRouter(<Meals />);

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
    renderWithRouter(<Meals />);

    const buttonSearch = screen.getByTestId('search-button');

    userEvent.click(buttonSearch);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
});
