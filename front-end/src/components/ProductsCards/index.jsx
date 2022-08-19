import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../../context/CartContext';
import addItem from '../../helpers/addItem';
import removeItem from '../../helpers/removeItem';
import style from './style.module.css';
import configPrice from '../../helpers/configPrice';

export default function ProductsCards({ p }) {
  const { setCart, cart } = useContext(CartContext);

  const [qtd, setQtd] = useState(() => cart.products.find(
    (prod) => prod.id === p.id,
  )?.qtd || 0);

  useEffect(() => {
    const { price, name, id } = p;
    const bodyProduct = { price, id, name, qtd };
    if (qtd) {
      setCart((prev) => (
        { ...prev, products: addItem(prev.products, id, bodyProduct) }));
    } else {
      setCart((prev) => (
        { ...prev, products: removeItem(prev.products, id) }));
    }
  }, [qtd]);

  return (
    <div className={ style.container__card }>
      <div className={ style.container__image }>
        <img
          width="100px"
          className="imagem"
          src={ p.url_image }
          alt={ p.name }
        />
      </div>
      <div className={ style.container__name }>
        <p>
          {p.name}
        </p>
      </div>
      <div className={ style.container__price }>
        <p>
          {configPrice(p.price)}
        </p>
      </div>
      <div className={ style.container__alter_quantity }>
        <button
          type="button"
          className={ style.button__sub }
          onClick={ () => setQtd((prev) => prev - 1) }
          disabled={ !qtd }
        >
          -
        </button>
        <input
          placeholder="0"
          value={ qtd }
          type="text"
          min="0"
          onChange={ (e) => setQtd(Number(e.target.value)) }
        />
        <button
          className={ style.button__add }
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
