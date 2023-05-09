import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Meals from '../pages/Meals';
import Provider from '../contexts/MyProvider';
import mockMealsName from '../helpers/MockMealsName';
import App from '../App';
// import oneMeal from '../../cypress/mocks/oneMeal';
import mockMealsIngredient from '../helpers/MockMealsIngredient';
import mockMealsFirstLetter from '../helpers/MockMealsFirstLetter';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import Drinks from '../pages/Drinks';
import mockDrinksIngredient from '../helpers/MockDrinksIngredient';
import mockDrinksFirstLetter from '../helpers/MockDrinksFirstLetter';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';

const testIdInput = 'search-input';
const testIdSearchButton = 'exec-search-btn';
describe('Testes referente ao componente SearchBar de Meals', () => {
  test('Verifica se os elementos de Meals estão sendo renderizados na tela', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/meals');
    });

    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);

    const radioName = await screen.findByRole('radio', { name: /name/i });
    const radioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    const radioFirstLetter = await screen.findByRole('radio', { name: /first letter/i });
    const inputSearch = await screen.findByTestId(testIdInput);
    expect(radioName).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
  });
  test('Teste referentes a api de Meals com radio ingredient', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealsIngredient) }));

    act(() => {
      history.push('/meals');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioIngredient);
    userEvent.type(inputSearch, 'chicken');
    expect(inputSearch).toHaveValue('chicken');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('Teste referentes a api de Meals com radio Name ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealsName) }));

    act(() => {
      history.push('/meals');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioName = await screen.getByRole('radio', { name: /name/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'garlic');
    expect(inputSearch).toHaveValue('garlic');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=garlic';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endPoint);

    await waitFor(() => {
      act(() => history.push('/meals/52815'));

      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52815');
    });
  });

  test('Teste se ao digitar mais que uma letra no First Letter o alert aparece ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    act(() => {
      history.push('/meals');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioFirstLetter = await screen.findByRole('radio', { name: /first letter/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioFirstLetter);
    userEvent.type(inputSearch, 'chocolate');
    expect(inputSearch).toHaveValue('chocolate');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Teste referentes a api de Meals com radio First Letter ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealsFirstLetter) }));

    act(() => {
      history.push('/meals');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioFirstLetter = await screen.findByRole('radio', { name: /first letter/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioFirstLetter);
    userEvent.type(inputSearch, 'y');
    expect(inputSearch).toHaveValue('y');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?f=y';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endPoint);
    await waitFor(() => {
      act(() => history.push('/meals/52871'));

      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52871');
    });
  });

  test('Teste se a receita não for encontrada o alerta aparece ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(emptyMeals) }));

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    act(() => {
      history.push('/meals');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);

    const radioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioIngredient);
    userEvent.type(inputSearch, 'xablau');
    expect(inputSearch).toHaveValue('xablau');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});

describe('Testes referente ao componente SearchBar de Drinks', () => {
  test('Verifica se os elementos de Drinks estão sendo renderizados na tela', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    act(() => {
      history.push('/drinks');
    });

    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);

    const radioName = await screen.findByRole('radio', { name: /name/i });
    const radioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    const radioFirstLetter = await screen.findByRole('radio', { name: /first letter/i });
    const inputSearch = await screen.findByTestId(testIdInput);
    expect(radioName).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
  });
  test('Teste referentes a api de Drinks com radio ingredient', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinksIngredient) }));

    act(() => {
      history.push('/drinks');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioIngredient);
    userEvent.type(inputSearch, 'lemon');
    expect(inputSearch).toHaveValue('lemon');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('Teste referentes a api de Drinks com radio Name ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink) }));

    act(() => {
      history.push('/drinks');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioName = await screen.getByRole('radio', { name: /name/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioName);
    userEvent.type(inputSearch, 'aquamarine');
    expect(inputSearch).toHaveValue('aquamarine');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endPoint);
    await waitFor(() => {
      act(() => history.push('/drinks/178319'));
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
    });
  });

  test('Teste se ao digitar mais que uma letra no First Letter o alert aparece ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    act(() => {
      history.push('/drinks');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioFirstLetter = await screen.findByRole('radio', { name: /first letter/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioFirstLetter);
    userEvent.type(inputSearch, 'mojito');
    expect(inputSearch).toHaveValue('mojito');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Teste referentes a api de Drinks com radio First Letter ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinksFirstLetter) }));

    act(() => {
      history.push('/drinks');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);
    const radioFirstLetter = await screen.findByRole('radio', { name: /first letter/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioFirstLetter);
    userEvent.type(inputSearch, 'y');
    expect(inputSearch).toHaveValue('y');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });

  test('Teste se a receita drink não for encontrada o alerta aparece ', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(emptyDrinks) }));

    jest.spyOn(global, 'alert').mockImplementation(() => {});

    act(() => {
      history.push('/drinks');
    });
    const buttonSearchImg = screen.getByRole('img', { name: /search/i });
    userEvent.click(buttonSearchImg);

    const radioIngredient = await screen.findByRole('radio', { name: /ingredient/i });
    const inputSearch = await screen.findByTestId(testIdInput);

    userEvent.click(radioIngredient);
    userEvent.type(inputSearch, 'xablau');
    expect(inputSearch).toHaveValue('xablau');
    const buttonSearch = screen.getByTestId(testIdSearchButton);
    userEvent.click(buttonSearch);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});
