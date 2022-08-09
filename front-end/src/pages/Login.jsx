import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const axios = require('axios');

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [roles, setRoles] = useState('');

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
      localStorage.setItem('token', JSON.stringify(login.data));
      const { role } = login.data;
      if (role === 'customer') setRoles('customer');
      if (role === 'seller') setRoles('seller');
      if (role === 'administrator') setRoles('administrator');
    } catch (error) {
      setErro(true);
      const { message } = error.response.data;
      setMessageError(message);
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
          type="button"
          data-testid="common_login__button-login"
          disabled={ disable }
          onClick={ () => submit() }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
        {roles === 'customer' && navigate('/customer/products')}
        {roles === 'seller' && navigate('/seller/orders')}
        {roles === 'administrator' && navigate('/admin/manage')}
        {erro && (
          <p data-testid="common_login__element-invalid-email">
            {messageError}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
