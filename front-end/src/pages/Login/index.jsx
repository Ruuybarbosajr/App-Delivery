import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const axios = require('axios');

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(false);
  const [messageError, setMessageError] = useState('');
  const { setUserData } = useContext(UserContext);

  const emailRegex = /\S+@\S+\.\S+/;
  const validEmail = emailRegex.test(email);
  const minPassword = 6;
  const disable = !(validEmail && password.length >= minPassword);

  const submit = async () => {
    try {
      const port = process.env.REACT_APP_PORT_BACK;
      const login = await axios.post(`http://localhost:${port}/login`, {
        email,
        password,
      });
      setUserData(login.data);
      localStorage.setItem('user', JSON.stringify(login.data));
      localStorage.setItem('cart', JSON.stringify({ products: [], totalPrice: '0.00' }));
      const { role } = login.data;
      if (role === 'customer') navigate('/customer/products');
      if (role === 'seller') navigate('/seller/orders');
      if (role === 'administrator') navigate('/admin/manage');
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
