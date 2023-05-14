import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavoriteRecipes() {
  const [arrayFavorite, setArrayFavorite] = useState([]);
  // const [favorite, setFavorite] = useState(true);
  useEffect(() => {
    const getLocalStorage = () => {
      const arrayLocalStorage = JSON
        .parse(localStorage.getItem('favoriteRecipes')) || [];

      console.log(arrayLocalStorage);

      setArrayFavorite(arrayLocalStorage);
    };
    getLocalStorage();
  }, []);

  // const FavoriteButton = () => {
  //   setFavorite(false);
  // };
  return (
    <section>
      {
        arrayFavorite.map((element, index) => (
          <div key={ element.name }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ element.image }
              alt={ element.name }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{element.category}</p>
            <p data-testid={ `${index}-horizontal-name` }>{element.name}</p>
            {element.type !== 'drink'
              ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${element.nationality} - ${element.category}`}
                </p>
              )
              : (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {element.alcoholicOrNot}
                </p>
              )}
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              { shareIcon }
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              // onClick={ FavoriteButton }
              src={ blackHeartIcon }
            >
              <img
                src={ blackHeartIcon }
                alt="blackHeartIcon"
              />
            </button>
          </div>
        ))
      }
    </section>
  );
}

export default CardFavoriteRecipes;
