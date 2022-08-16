import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProductDetailsNav from '../../components/ProductsDetails-nav';
import TabelaOrder from '../../components/TabelaOrder';
// import CartContext from '../../context/CartContext';

const axios = require('axios');

export default function OrderDetails() {
  // const navigate = useNavigate();
  // const { cart } = useContext(CartContext);
  const accessToken = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const [sales, setSales] = useState([]);

  useEffect(
    () => {
      async function getSales(ids) {
        const { data } = await axios
          .get(`http://localhost:3001/sales/${ids}`, {
            headers: {
              authorization: accessToken.token,
            },
          });
        setSales([data]);
      }
      getSales(id);
    },
    [],
  );

  return (
    <div>
      <Header />
      <h1>Detalhes do pedido</h1>
      {sales.map((sale) => (
        <ProductDetailsNav element={ sale } key={ sale.id } />
      ))}
      <TabelaOrder />
    </div>
  );
}
