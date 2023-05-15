import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import context from '../contexts/MyContext';
import icon from '../images/Recipes Icon.png';

function Header({ title, searchIcon }) {
  const { setInputApi } = useContext(context);
  const [inputSearch, setInputSearch] = useState(false);
  const history = useHistory();

  const historyPush = () => {
    history.push('/profile');
  };

  const searchInput = () => {
    setInputSearch(!inputSearch);
  };

  const handleInput = ({ target: { value } }) => {
    setInputApi(value);
  };

  return (
    <nav className="nav-bar">
      <h1
        id="margin"
        className="title is-3 white"
        data-testid="page-title"
      >
        <img className="icon" src={ icon } alt="" />
        { title }
      </h1>

      <div className="buttons-header">
        <button
          className="button is-rounded pink-button"
          type="button"
          onClick={ historyPush }
          data-testid="profile-button"
        >
          <img
            className="inverted"
            src={ profile }
            alt="perfil"
            data-testid="profile-top-btn"
          />
        </button>
        {
          searchIcon && (
            <button
              className="button is-rounded pink-button"
              type="button"
              onClick={ searchInput }
              data-testid="search-button"
            >
              <img
                className="inverted"
                src={ search }
                alt="search"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
      </div>

      {
        inputSearch && (
          <input
            className="input form-input"
            type="text"
            data-testid="search-input"
            onChange={ handleInput }
          />
        )
      }
      {
        inputSearch && (<SearchBar />)
      }
    </nav>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
