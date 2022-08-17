import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ProductDetailsNav from '../../components/ProductsDetails-nav';
import TabelaOrder from '../../components/TabelaOrder';

const axios = require('axios');

export default function OrderDetails() {
  const accessToken = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const [sale, setSale] = useState(null);

  useEffect(
    () => {
      async function getSales() {
        const { data } = await axios
          .get(`http://localhost:3001/sales/${id}`, {
            headers: {
              authorization: accessToken.token,
            },
          });
        console.log(data);
        setSale(data);
      }
      getSales();
    },
    [],
  );

  if (!sale) return <p>loading...</p>;
  return (
    <div>
      <Header />
      <h1>Detalhes do pedido</h1>
      <ProductDetailsNav element={ sale } />
      <TabelaOrder products={ sale.products } totalPrice={ sale.totalPrice } />
    </div>
  );
}
