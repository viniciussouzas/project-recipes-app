import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const emailStorage = JSON.parse(localStorage.getItem('user'));
  const verifyEmail = () => {
    if (emailStorage && emailStorage.email) {
      const { email } = emailStorage;
      return email;
    }
  };

  const doneRecipesPush = () => {
    history.push('/done-recipes');
  };

  const favoriteRecipesPush = () => {
    history.push('/favorite-recipes');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <Header title="Profile" searchIcon={ false } />
      <p data-testid="profile-email">{ verifyEmail() }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ doneRecipesPush }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ favoriteRecipesPush }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
