import { useState, useEffect, useContext } from 'react';
import ProductsCards from '../../components/ProductsCards';
import CartContext from '../../context/cartContext';

const axios = require('axios');

export default function ProductsWide() {
  const { cart, setCart } = useContext(CartContext);
  const accessToken = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  // const [qtd, setQtd] = useState(0);
  console.log('cart:', cart);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:3001/products', {
          headers: {
            authorization: accessToken.token,
          },
        })
        .then((product) => {
          // console.log(product.data);
          setProducts(product.data);
        });
    } catch (error) {
      // console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>tela produtos</h1>
      {products.map((product) => (
        <ProductsCards p={ product } key={ product.id } />
      ))}
      <button type="button"> Ver carrinho: </button>

    </div>
  );
}
