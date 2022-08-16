import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import styles from './index.module.css';

function Header() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <header>
      <nav className={ styles.navbar }>
        <div data-testid="customer_products__element-navbar-link-products">
          <Link to="/customer/products">PRODUTOS</Link>
        </div>

        <div data-testid="customer_products__element-navbar-link-orders">
          <Link to="/customer/orders">MEUS PEDIDOS</Link>
        </div>

        <div data-testid="customer_products__element-navbar-user-full-name">
          <span>{ userData.name }</span>
        </div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => logout() }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default Header;
