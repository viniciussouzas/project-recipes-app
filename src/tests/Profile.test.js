import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa página Profile', () => {
  const login = {
    email: 'john.doe@example.com',
  };

  test('testa se botão redireciona para rota "/done-recipes"', () => {
    const { history } = renderWithRouter(<Profile />);

    localStorage.setItem('user', JSON.stringify(login));

    const btn = screen.getByRole('button', {
      name: /done recipes/i,
    });

    userEvent.click(btn);

    const { pathname } = history.location;

    expect(pathname).toBe('/done-recipes');
  });
  test('testa se botão redireciona para rota "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<Profile />);

    localStorage.setItem('user', JSON.stringify(login));

    const btn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    userEvent.click(btn);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorite-recipes');
  });
  test('testa se botão redireciona para rota "/"', () => {
    const { history } = renderWithRouter(<Profile />);

    localStorage.setItem('user', JSON.stringify(login));

    const btn = screen.getByRole('button', {
      name: /Logout/i,
    });

    userEvent.click(btn);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('testa se email aparece no perfil', () => {
    renderWithRouter(<Profile />);

    localStorage.setItem('user', JSON.stringify(login));

    const email = JSON.parse(localStorage.getItem('user'));

    expect(email).toEqual(login);
  });
});
