import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import UserContext from '../../context/UserContext';
import style from './index.module.css';
import logo from '../../images/logo(1).png';

function Header() {
  const { userData: { role, name } } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [titleButton, setTitleButton] = useState('Produtos');
  const [path, setPath] = useState('/customer/products');

  useEffect(() => {
    if (role !== 'customer' && role) {
      setTitleButton('Pedidos');
      setPath('/seller/orders');
    }
  }, [role]);

  function logout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  function stringAvatar(parameterName = 'avatar seila') {
    const first = parameterName.split(' ')[0][0];
    const second = parameterName.split(' ')[1] ? parameterName.split(' ')[1][0] : '';
    return {
      sx: {
        bgcolor: '#3E3E3E;',
      },
      children: `${first.toUpperCase()}${second.toUpperCase()}`,
    };
  }

  return (
    <header className={ style.container__header }>
      <div className={ style.container__links }>
        <div className={ style.container__logo }>
          <img
            src={ logo }
            alt="logo"
          />
        </div>
        <div
          className={
            `${style.container__link} ${pathname.includes(path)
              ? style.sublime : ''}`
          }
        >
          <Link
            to={ path }
          >
            { titleButton }
          </Link>
        </div>
        { role === 'customer'
        && (
          <div
            className={
              `${style.container__link} ${pathname.includes('orders')
                ? style.sublime : ''}`
            }
          >
            <Link to="/customer/orders">Meus Pedidos</Link>
          </div>)}
      </div>
      <div className={ style.container__logout }>
        <div className={ style.container__name }>
          <Avatar className={ style.avatar } { ...stringAvatar(name) } />
        </div>
        <div className={ style.container__button }>
          <button
            type="button"
            onClick={ () => logout() }
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
