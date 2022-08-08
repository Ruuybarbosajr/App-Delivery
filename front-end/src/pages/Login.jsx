import { useState } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const emailRegex = /\S+@\S+\.\S+/;
  const validEmail = emailRegex.test(email);
  const minPassword = 6;
  const disable = !(validEmail && password.length >= minPassword);

  const submit = async () => {
    try {
      const login = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      console.log(login);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>é us guri</h1>

      <form>
        <label htmlFor="login">
          Login:
          <input
            type="text"
            data-testid="common_login__input-email"
            value={ email }
            placeholder="Digite seu email aqui"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="text"
            data-testid="common_login__input-password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>

        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disable }
          onClick={ () => submit() }
        >
          Login
        </button>

        <Link to="/register">
          <button type="submit" data-testid="common_login__button-register">
            Ainda não tenho conta
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
