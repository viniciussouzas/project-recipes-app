import React from 'react';
import { getByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const testIdEmail = 'email-input';
const testIdPassword = 'password-input';

describe('Testa componente Header', () => {
  test('Verifica se botão profile envia para rota "/profile"', async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const btnEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'xablau@gmail.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnEnter);

    const buttonProfile = getByTestId('profile-button');

    userEvent.click(buttonProfile);

    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });
  test('Verifica se botão search renderiza um input', async () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const btnEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'xablau@gmail.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnEnter);

    const buttonSearch = getByTestId('search-button');

    userEvent.click(buttonSearch);

    const input = getByTestId('search-input');

    expect(input).toBeInTheDocument();
  });
});
