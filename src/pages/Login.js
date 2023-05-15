import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/Recipes App Logo white.png';

function Login() {
  const MIN_NUMBER = 6;
  const validEmail = /^\S+@\S+\.\S+$/;

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/meals');
  };

  const verifyPassword = login.password.length > MIN_NUMBER;

  const isValid = validEmail.test(login.email) && verifyPassword;

  return (
    <form className="field">
      <div className="form-div">
        <img src={ logo } alt="logo" className="img-logo" />
        <input
          className={ `input form-input ${isValid ? 'is-success' : 'is-danger'}` }
          placeholder="Type your e-mail..."
          type="email"
          name="email"
          value={ login.email }
          onChange={ handleChange }
          data-testid="email-input"
        />
        <input
          className={ `input form-input ${isValid ? 'is-success' : 'is-danger'}` }
          placeholder="Type your password..."
          type="password"
          name="password"
          value={ login.password }
          onChange={ handleChange }
          data-testid="password-input"
        />
        <div id="passwordHelpBlock" className="form-text-mine">
          Your password must be 7-20 characters long.
        </div>
        <div className="buttons">
          <button
            className="button is-link is-rounded"
            type="button"
            data-testid="login-submit-btn"
            disabled={ !isValid }
            onClick={ handleClick }
          >
            Enter
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
