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
  const [valorTotal, setValorTotal] = useState('0');
  console.log('cart:', cart);

  function verCarrinho() {
    const value = cart.reduce((acc, product) => acc + product.qtd * product.price, 0);
    setValorTotal(value.toFixed(2));
    return value;
  }

  useEffect(() => {
    verCarrinho();
  }, [cart]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios
        .get('http://localhost:3002/products', {
          headers: {
            authorization: accessToken.token,
          },
        });
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      {products.length > 0 ? (
        products.map((product) => (
          <ProductsCards p={ product } key={ product.id } />
        ))
      ) : (
        <div>Carregando</div>
      )}

      <button
        disabled={ cart.length === 0 }
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__button-cart"
        type="button"
      >
        Ver carrinho:
        <span data-testid="customer_products__checkout-bottom-value">
          {valorTotal.replace('.', ',')}
        </span>
      </button>
    </div>
  );
}
