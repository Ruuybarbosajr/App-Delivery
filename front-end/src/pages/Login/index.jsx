/* eslint-disable react/no-multi-comp */
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import UserContext from '../../context/UserContext';
import 'animate.css';
import style from './style.module.css';

const axios = require('axios');

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageError, setMessageError] = useState(null);
  const { setUserData } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const emailRegex = /\S+@\S+\.\S+/;
  const validEmail = emailRegex.test(email);
  const minPassword = 6;
  const disable = !(validEmail && password.length >= minPassword);

  const submit = async (event) => {
    event.preventDefault();
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
      const { message } = error.response.data;
      enqueueSnackbar(message, { variant: 'error' });
      setMessageError(message);
    }
  };

  return (
    <div className={ style.container__body }>
      <img
        className={ `${style.logo} animate__animated animate__bounceInDown` }
        src="https://guridelivery.com.br/wp-content/uploads/2021/03/GURI-LOGO-e1617919707927-1024x468.png"
        alt="logo"
      />
      <div className={ style.container__login }>
        <Box
          component="form"
          sx={ {
            '& .MuiTextField-root': { m: 1, width: '40ch' },
          } }
          noValidate
          className={ style.container__form }
          autoComplete="off"
          onSubmit={ submit }
        >
          <div className={ style.container__inputs }>
            <TextField
              error={ messageError }
              value={ email }
              label="Email"
              type="Error"
              onChange={ (e) => setEmail(e.target.value) }
            />
            <TextField
              error={ messageError }
              value={ password }
              type="password"
              onChange={ (e) => setPassword(e.target.value) }
              label="Senha"
            />
          </div>
          <div className={ style.container__buttons }>
            <Button
              className={ style.button__enter }
              variant="contained"
              size="medium"
              disabled={ disable }
              type="submit"
            >
              Entrar
            </Button>
            <Button
              className={ style.button__enter }
              variant="contained"
              size="medium"
              onClick={ () => navigate('/register') }
            >
              Registrar
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default function IntergrationNotistack() {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <Login />
    </SnackbarProvider>
  );
}
