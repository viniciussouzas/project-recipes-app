import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './Recommendations.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

function Recommendations({ data, pageTypes }) {
  // pageTypes vem por props e pode ser 'meals' ou 'drinks'

  const MAX_SIZE = 6;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <Slider { ...settings }>
      {
        data.slice(0, MAX_SIZE).map((item, index) => (
          <Link
            key={ index }
            to={
              pageTypes === 'meals'
                ? `/meals/${item.idMeal}`
                : `/drinks/${item.idDrink}`
            }
          >
            <div
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={
                  pageTypes === 'meals'
                    ? item.strMealThumb
                    : item.strDrinkThumb
                }
                alt={
                  pageTypes === 'meals'
                    ? item.strMeal
                    : item.strDrink
                }
              />
              <h3
                data-testid={ `${index}-recommendation-title` }
              >
                {
                  pageTypes === 'meals'
                    ? item.strMeal
                    : item.strDrink
                }
              </h3>
            </div>
          </Link>
        ))
      }
    </Slider>
  );
}

Recommendations.propTypes = {
  data: PropTypes.arrayOf([]),
  pageTypes: PropTypes.string,
}.isRequired;

export default Recommendations;
