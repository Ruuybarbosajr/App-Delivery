import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './appContext';
import CartContext from './cartContext';

function Provider({ children }) {
  const [loginUser, setLoginUser] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const contextValue = useMemo(() => ({ loginUser,
    setLoginUser }), [loginUser]);
  const cartValue = useMemo(() => ({ cart,
    setCart }), [cart]);
  return (

    <CartContext.Provider value={ cartValue }>
      <AppContext.Provider value={ contextValue }>
        {children}
      </AppContext.Provider>
    </CartContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Provider;
