import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import context from '../contexts/MyContext';

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
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <button
        type="button"
        onClick={ historyPush }
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
            onClick={ searchInput }
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
            onChange={ handleInput }
          />
        )
      }
      {
        inputSearch && (<SearchBar />)
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
