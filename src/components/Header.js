import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';

function Header({ title, searchIcon }) {
  const [inputSearch, setInputSearch] = useState(false);
  const history = useHistory();
  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
        data-testid="profile-button"
      >
        <img
          src={ profile }
          alt="perfil"
          data-testid="profile-top-btn"
        />
      </button>
      {
        searchIcon && (
          <button
            type="button"
            onClick={ () => setInputSearch(!inputSearch) }
            data-testid="search-button"
          >
            <img
              src={ search }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      {
        inputSearch && (
          <input
            type="text"
            data-testid="search-input"
          />
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
