import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';

function ProviderCart({ children }) {
  const [cart, setCart] = useState({
    products: JSON.parse(localStorage.getItem('cart')).products,
    totalPrice: JSON.parse(localStorage.getItem('cart')).totalPrice,
  });

  useEffect(() => {
    const totalPrice = cart.products.reduce((acc, product) => (
      acc + product.qtd * product.price), 0).toFixed(2);

    setCart((prev) => ({ ...prev, totalPrice }));
    localStorage.setItem('cart', JSON.stringify({ totalPrice, products: cart.products }));
  }, [cart.products]);

  const cartValue = useMemo(() => ({ cart,
    setCart }), [cart]);

  return (
    <CartContext.Provider value={ cartValue }>
      {children}
    </CartContext.Provider>
  );
}

ProviderCart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderCart;
