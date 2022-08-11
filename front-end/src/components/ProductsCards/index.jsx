/* eslint-disable react/prop-types */

import { useState } from 'react';

export default function ProductsCards({ p }) {
  const [qtd, setQtd] = useState(0);

  function soma() {
    setQtd(Number(qtd + 1));
  }

  function subtrai() {
    setQtd(Number(qtd - 1));
  }

  return (
    <div className="Class">

      <div>
        <p data-testid={ `customer_products__element-card-price-${p.id}` }>
          R$
          {' '}
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
          onClick={ () => subtrai() }
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
          onClick={ () => soma() }
        >
          +
        </button>
      </div>

    </div>
  );
}
