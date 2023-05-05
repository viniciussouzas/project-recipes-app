import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const testIdEmail = 'email-input';
const testIdPassword = 'password-input';

describe('Testa o componente Login', () => {
  test('Verifica se os inputs são renderizados na tela', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;

    expect(pathname).toBe('/');

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se o botão está desabilitado ao digitar informações inválidas', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const btnEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'xablau');
    userEvent.type(inputPassword, '123456');

    expect(btnEnter).toBeDisabled();
  });

  test('Verifica se o botão está habilitado ao digitar informações válidas', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const btnEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'xablau@gmail.com');
    userEvent.type(inputPassword, '1234567');

    expect(btnEnter).toBeEnabled();
  });
});
