import { useState } from 'react';

function Login() {
  const MIN_NUMBER = 6;
  const validEmail = /^\S+@\S+\.\S+$/;

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const saveUserOnLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
  };

  const verifyPassword = login.password.length > MIN_NUMBER;

  const isValid = validEmail.test(login.email) && verifyPassword;

  return (
    <form>
      <input
        type="email"
        name="email"
        value={ login.email }
        onChange={ handleChange }
        data-testid="email-input"
      />
      <input
        type="password"
        name="password"
        value={ login.password }
        onChange={ handleChange }
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isValid }
        onClick={ saveUserOnLocalStorage }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
