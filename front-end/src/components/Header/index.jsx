import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

function Header() {
  const getName = () => {
    const user = JSON.parse(localStorage.getItem('token'));
    return user;
  };

  return (
    <header>
      <nav className={ styles.navbar }>
        <div>
          <Link to="/customer/products">PRODUTOS</Link>
        </div>

        <div>
          <Link to="/customer/orders">MEUS PEDIDOS</Link>
        </div>

        <div>
          <span>{ getName() }</span>
        </div>
        <Link
          to="/login"
        >
          <button
            type="button"
            onClick={ () => localStorage.setItem('token', []) }
          >
            Sair
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
