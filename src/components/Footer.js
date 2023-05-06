import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  const drinkPush = () => {
    history.push('/drinks');
  };
  const mealPush = () => {
    history.push('/meals');
  };
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        type="button"
        onClick={ drinkPush }
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ mealPush }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
          data-testid="meals-bottom-btn"
        />
      </button>

    </footer>
  );
}

export default Footer;
