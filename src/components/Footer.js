import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contexts/MyContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const { setFilterData } = useContext(context);
  const history = useHistory();

  const drinkPush = () => {
    setFilterData([]);
    history.push('/drinks');
  };
  const mealPush = () => {
    setFilterData([]);
    history.push('/meals');
  };
  return (
    <div className="footer-bar">
      <footer
        data-testid="footer"
        className="footer"
      >
        <button
          className="button is-rounded pink-button"
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
          className="button is-rounded pink-button"
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
    </div>
  );
}

export default Footer;
