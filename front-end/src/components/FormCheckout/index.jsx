import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const axios = require('axios');

export default function FormCheckout() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [sellers, setSellers] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem('user'));

  const [sale, setSale] = useState({
    sellerId: '',
    deliveryAddress: '',
    deliveryNumber: '',
  });

  async function getSellerId() {
    try {
      const getSellers = await axios.get('http://localhost:3001/user/seller/all', {
        headers: {
          authorization: accessToken.token,
        },
      });

      setSellers(getSellers.data);
      const [seller] = getSellers.data;
      setSale((prev) => ({ ...prev, sellerId: seller.id }));
    } catch (error) {
      console.log(error);
    }
  }

  async function getId() {
    const { products, totalPrice } = cart;
    const { data } = await axios.post('http://localhost:3001/sales/register', {
      ...sale, products, totalPrice,
    }, {
      headers: {
        authorization: accessToken.token,
      },
    });
    navigate(`/customer/orders/${data}`);
  }

  useEffect(() => {
    getSellerId();
  }, []);

  return (
    <form>
      <h1>Detalhes e endereço para entrega</h1>
      <label htmlFor="seller">
        P.Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          onChange={ (e) => setSale((prev) => ({ ...prev, sellerId: e.target.value })) }
          name="select"
        >
          { sellers.map((s) => (
            <option key={ s.id } value={ s.id }>{s.name}</option>
          ))}

        </select>
      </label>
      <label htmlFor="address">
        Endereço:
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          value={ sale.deliveryAddress }
          onChange={ (e) => setSale((prev) => (
            { ...prev, deliveryAddress: e.target.value })) }
        />
      </label>
      <label htmlFor="number">
        Número:
        <input
          type="text"
          data-testid="customer_checkout__input-addressNumber"
          value={ sale.deliveryNumber }
          onChange={ (e) => setSale((prev) => (
            { ...prev, deliveryNumber: e.target.value })) }
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        onClick={ () => getId() }
        type="button"
      >
        FINALIZAR PEDIDO

      </button>

    </form>
  );
}
