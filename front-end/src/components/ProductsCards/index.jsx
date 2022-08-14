import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../../context/cartContext';

export default function ProductsCards({ p }) {
  const { setCart } = useContext(CartContext);
  const [qtd, setQtd] = useState(0);

  function removeItem(prev, name) {
    return prev.filter((product) => product.name !== name);
  }

  useEffect(() => {
    const { name, price, id } = p;
    if (qtd) setCart((prev) => [...removeItem(prev, name), { name, qtd, price, id }]);
    else setCart((prev) => removeItem(prev, name));
  }, [qtd, p, setCart]);

  return (
    <div className="Class">
      <div>
        <p data-testid={ `customer_products__element-card-price-${p.id}` }>
          {p.price.replace('.', ',')}
        </p>
        <img
          width="100px"
          className="imagem"
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
          onClick={ () => setQtd((prev) => prev - 1) }
          disabled={ !qtd }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${p.id}` }
          placeholder="0"
          value={ qtd }
          type="number"
          min="0"
          onChange={ (e) => setQtd(Number(e.target.value)) }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${p.id}` }
          type="button"
          onClick={ () => setQtd((prev) => prev + 1) }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductsCards.propTypes = {
  p: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};
