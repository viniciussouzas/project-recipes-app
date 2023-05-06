import React from 'react';

function SearchBar() {
  return (
    <nav>
      <input type="radio" data-testid="ingredient-search-radio" />
      <input type="radio" data-testid="name-search-radio" />
      <input type="radio" data-testid="first-letter-search-radio" />
      <button data-testid="exec-search-btn">Search</button>
    </nav>
  );
}

export default SearchBar;
