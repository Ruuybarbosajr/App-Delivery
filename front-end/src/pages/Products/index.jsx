import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiShoppingCart } from 'react-icons/gi';
import Header from '../../components/Header';
import ProductsCards from '../../components/ProductsCards';
import CartContext from '../../context/CartContext';
import configPrice from '../../helpers/configPrice';
import style from './style.module.css';

const axios = require('axios');

export default function ProductsWide() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [prod, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios
          .get('http://localhost:3001/products', {
            headers: {
              authorization: JSON.parse(localStorage.getItem('user'))?.token,
            },
          });
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className={ style.container__body_products }>
        <div className={ style.container__products }>
          {prod.map((product) => (<ProductsCards p={ product } key={ product.id } />))}
        </div>
        <button
          className={ style.button__cart }
          disabled={ !cart.products.length }
          onClick={ () => navigate('/customer/checkout') }
          type="button"
        >
          <GiShoppingCart />
          <span>
            {configPrice(cart.totalPrice)}
          </span>
        </button>
      </div>
    </div>
  );
}
