import React, { useEffect, useState } from 'react';
import { fetchApiDrinks } from '../service/APIs';
import './InProgress.css';

function InProgressDrinks(props) {
  const idProps = props;
  const { id } = idProps;
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [isChecked, setIsChecked] = useState(false);

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

  const handleChange = () => {
    setIsChecked(!isChecked);
  };
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
        getIngredients.map((e, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={ isChecked[index] === true ? 'ingredients' : '' }
          >
            {e[1]}
            <input
              id={ e[index] }
              checked={ e[isChecked] }
              type="checkbox"
              // checked={ e[isChecked] }
              // value={ index }
              onChange={ handleChange }
            />
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
