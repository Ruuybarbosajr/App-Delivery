import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ProductDetailsNav from '../../components/ProductsDetails-nav';
import TableOrder from '../../components/TableOrder';

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
      <ProductDetailsNav element={ sale } />
      <TableOrder products={ sale.products } totalPrice={ Number(sale.totalPrice) } />
    </div>
  );
}
