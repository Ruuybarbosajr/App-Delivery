import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

function Header() {
  const getName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.name;
  };

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
          <span>{ getName() }</span>
        </div>
        <Link
          to="/login"
        >
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => localStorage.setItem('user', []) }
          >
            Sair
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
