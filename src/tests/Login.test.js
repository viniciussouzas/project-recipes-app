import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import Provider from '../contexts/MyProvider';

const testIdEmail = 'email-input';
const testIdPassword = 'password-input';
const loginBtn = 'login-submit-btn';

describe('Testa o componente Login', () => {
  // Spying on localStorage in Jest retirado do site: https://amitd.co/code/testing/spying-on-localstorage-in-jest
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
  Object.setPrototypeOf(window.localStorage.setItem, jest.fn());

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
    const btnEnter = screen.getByTestId(loginBtn);

    userEvent.type(inputEmail, 'xablau');
    userEvent.type(inputPassword, '123456');

    expect(btnEnter).toBeDisabled();
  });

  test('Verifica se o botão está habilitado ao digitar informações válidas', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const btnEnter = screen.getByTestId(loginBtn);

    userEvent.type(inputEmail, 'xablau@gmail.com');
    userEvent.type(inputPassword, '1234567');

    expect(btnEnter).toBeEnabled();
  });

  test('Verifica se salva o email do usuario no localStorage', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const btnEnter = screen.getByTestId(loginBtn);

    userEvent.type(inputEmail, 'xablau@gmail.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnEnter);

    expect(window.localStorage.setItem).toHaveBeenCalledWith('user', '{"email":"xablau@gmail.com"}');
  });

  test('Verifica se ao clicar no botão é redirecionado para /meals', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const btnEnter = screen.getByTestId(loginBtn);

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnEnter);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
