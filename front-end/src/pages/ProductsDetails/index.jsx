import { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProductDetailsNav from '../../components/ProductsDetails-nav';
import CartContext from '../../context/cartContext';

// verificar como pegar o cart do estado global

// const axios = require('axios');
// useEffect, useContext,
export default function ProductsDetails() {
  // const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [valorTotal, serValorTotal] = useState(0);
  // const accessToken = JSON.parse(localStorage.getItem('user'));
  const [sales] = useState([{
    nDoPedido: 'PEDIDO 0003',
    vendedora: 'fulanda de tal',
    data: '07/08/2020',
    status: 'ENTREGUE',
    statusPedido: 'MARCAR COMO ENTREGUE',
  }]);

  /* useEffect(() => {
    async function getSales() {
      const { data } = await axios
        .get('http://localhost:3002/sales/:id', {
          headers: {
            authorization: accessToken.token,
          },
        });
      setSales(data);
    }
    getSales();
  }, []); */

  function verCarrinho() {
    const value = cart.reduce((acc, product) => acc + product.qtd * product.price, 0);
    serValorTotal(value.toFixed(2));
    return value;
  }

  useEffect(() => {
    verCarrinho();
  }, [cart]);

  return (
    <div>
      <Header />
      <h1>Detalhes do pedido</h1>
      {sales.map((sale) => (
        <ProductDetailsNav element={ sale } key={ sale.nDoPedido } />
      ))}
      <button
        data-testid="customer_products__button-cart"
        type="button"
      >
        Total:
        {valorTotal}
      </button>
    </div>
  );
}
