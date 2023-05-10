import React, { useEffect, useState } from 'react';
import { fetchApiDrinks } from '../service/APIs';
import './InProgress.css';

function InProgressDrinks(props) {
  const idProps = props;
  const { id } = idProps;
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [listChecked, setListChecked] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const api = await fetchApiDrinks(id);
      const filteredApi = api.filter((drink) => drink.idDrink === id);
      setFilterDrinks([...filteredApi]);
      setFilterObject(...filteredApi);
    };
    fetchApi();
  }, [setFilterDrinks, id]);

  const objectEntries = Object.entries(filterObject);

  const getIngredients = objectEntries
    .filter((ingredient) => ingredient[0].includes('strIngredient'))
    .filter((ingredient) => ingredient[1] !== null && ingredient[1] !== '');

  const handleChange = ({ target }) => {
    target.parentElement.className = 'ingredients';
    setListChecked([...listChecked, target.value]);
  };

  const isChecked = (ingredient) => listChecked.some((item) => item === ingredient);

  return (
    <div>
      {filterDrinks.map((element, index) => (
        <section key={ index }>
          <img
            data-testid="recipe-photo"
            src={ element.strDrinkThumb }
            alt={ element.strDrink }
          />
          <h1 data-testid="recipe-title">{element.strDrink}</h1>
          <button
            type="button"
            data-testid="share-btn"
          >
            compartilhar
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            favoritar
          </button>
          <p data-testid="recipe-category">{element.strCategory}</p>
          <h3>Instrução</h3>
          <p data-testid="instructions">
            {element.strInstructions}
          </p>
        </section>
      ))}
      {
        getIngredients.map((ingredient, index) => (
          <label
            key={ index }
            htmlFor={ ingredient[1] }
            data-testid={ `${index}-ingredient-step` }
            className={ isChecked(`${ingredient[1]}`) ? 'ingredients' : '' }
          >
            <input
              id={ ingredient[1] }
              checked={ isChecked(ingredient[1]) }
              type="checkbox"
              onChange={ handleChange }
              value={ ingredient[1] }
            />
            {ingredient[1]}
          </label>
        ))
      }
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar

      </button>
    </div>
  );
}

export default InProgressDrinks;
