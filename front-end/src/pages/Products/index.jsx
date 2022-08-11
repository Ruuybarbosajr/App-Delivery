import { useState, useEffect } from 'react';
import ProductsCards from '../../components/ProductsCards';

const axios = require('axios');

export default function ProductsWide() {
  const accessToken = JSON.parse(localStorage.getItem('token'));
  const [products, setProducts] = useState([]);
  // const [qtd, setQtd] = useState(0);
  // console.log(products);

  useEffect(() => {
    try {
      axios
        .get('http://localhost:3002/products', {
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

    </div>
  );
}
