/* eslint-disable react/prop-types */

import { useState, useContext, useEffect } from 'react';
import CartContext from '../../context/cartContext';

export default function ProductsCards({ p }) {
  const { cart, setCart } = useContext(CartContext);
  const [qtd, setQtd] = useState(0);

  function soma(nome, valor) {
    const a = qtd;
    const number = -1;
    setQtd(Number(qtd + 1));
    const cartcp = [...cart];
    const searchIndex = cartcp.findIndex((item) => item.nome === nome);
    if (searchIndex === number) {
      cartcp.push({ nome, qtd: 1, valor });
    } else {
      cartcp[searchIndex].qtd = a + 1;
    }
    setCart(cartcp);
  }

  function subtrai(nome) {
    const a = qtd;
    setQtd(Number(qtd - 1));
    const cartcp = [...cart];
    const searchIndex = cartcp.findIndex((item) => item.nome === nome);
    if (cartcp[searchIndex].qtd === 1) {
      cartcp.splice(searchIndex, 1);
      setCart(cartcp);
    } else {
      cartcp[searchIndex].qtd = a - 1;
      setCart(cartcp);
    }
  }

  useEffect(() => {
    // console.log(cart);
  }, [cart]);

  return (
    <div className="Class">
      <div>
        <p data-testid={ `customer_products__element-card-price-${p.id}` }>
          {p.price}
        </p>
        <img
          data-testid={ `customer_products__img-card-bg-image-${p.id}` }
          src={ p.url_image }
          alt={ p.name }
        />

        <p data-testid={ `customer_products__element-card-title-${p.id}` }>
          {p.name}
        </p>
        <button
          data-testid={ `customer_products__button-card-rm-item-${p.id}` }
          type="button"
          onClick={ () => subtrai(p.name) }
          disabled={ !qtd }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${p.id}` }
          placeholder="0"
          value={ qtd }
          type="text"
          min="0"
          onChange={ (e) => setQtd(Number(e.target.value)) }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${p.id}` }
          type="button"
          onClick={ () => soma(p.name, p.price) }
        >
          +
        </button>
      </div>
    </div>
  );
}
