/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-multi-comp */
import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SnackbarProvider, useSnackbar } from 'notistack';
import UserContext from '../../context/UserContext';
import style from './style.module.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const { setUserData } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  async function submit(event) {
    event.preventDefault();
    try {
      const newUser = await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
      });
      setUserData(newUser.data);
      localStorage.setItem('cart', JSON.stringify({ products: [], totalPrice: '0.00' }));
      localStorage.setItem('user', JSON.stringify(newUser.data));
      navigate('/customer/products');
    } catch (error) {
      const { message } = error.response.data;
      enqueueSnackbar(message, { variant: 'error' });
    }
  }
  const handleButton = () => {
    const re = /\S+@\S+\.\S+/;
    const doze = 12;
    const seis = 6;
    if (name.length >= doze && re.test(email) && password.length >= seis) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  };

  React.useEffect(() => {
    handleButton();
  });

  return (
    <div className={ style.container__body }>
      <img
        className={ style.logo }
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
              helperText="Insira seu nome"
              value={ name }
              label="Name"
              type="text"
              onChange={ (e) => setName(e.target.value) }
            />
            <TextField
              helperText="Insira um email válido"
              value={ email }
              type="email"
              onChange={ (e) => setEmail(e.target.value) }
              label="Email"
            />
            <TextField
              helperText="Insira uma combinação de pelo menos seis caracteres"
              value={ password }
              type="password"
              onChange={ (e) => setPassword(e.target.value) }
              label="Senha"
            />
          </div>
          <div className={ style.container__buttons }>
            <Button
              className={ style.button__enter }
              disabled={ isDisabled }
              type="submit"
              data-testid="common_register__button-register"
            >
              Cadastrar
            </Button>
            <a href="/login">Já possui cadastro?</a>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default function IntergrationNotistack() {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <Register />
    </SnackbarProvider>
  );
}
