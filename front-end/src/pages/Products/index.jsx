import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProductsCards from '../../components/ProductsCards';
import CartContext from '../../context/cartContext';

const axios = require('axios');

export default function ProductsWide() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const accessToken = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  console.log('cart:', cart);

  function verCarrinho() {
    let contador = 0;
    cart.forEach((e) => {
      contador += e.qtd * e.price;
    });
    setValorTotal(Number(contador.toFixed(2)));
    return contador;
  }

  useEffect(() => {
    verCarrinho();
  }, [cart]);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:3001/products', {
          headers: {
            authorization: accessToken.token,
          },
        })
        .then((product) => {
          setProducts(product.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Header />
      {products.map((product) => (
        <ProductsCards p={ product } key={ product.id } />
      ))}

      <button
        disabled={ cart.length === 0 }
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__button-cart"
        type="button"
      >
        Ver carrinho:
        <span data-testid="customer_products__checkout-bottom-value">
          {valorTotal}
        </span>
      </button>
    </div>
  );
}
