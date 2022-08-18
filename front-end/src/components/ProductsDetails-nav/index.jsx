import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';

const axios = require('axios');

export default function ProductDetailsNav({ element }) {
  const [status, setStatus] = useState(element.status);
  const { userData: { role } } = useContext(UserContext);

  async function updateStatus(saleStatus) {
    try {
      await axios.patch(`http://localhost:3001/sales/${element.id}/update`, { status: saleStatus }, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('user'))?.token,
        } });
      setStatus(saleStatus);
    } catch (error) {
      console.error(error);
    }
  }

  function buildButton(otherStatus, diffOf, title) {
    const dataTestId = role === 'seller'
      ? 'seller_order_details__button-dispatch-check'
      : 'customer_order_details__button-delivery-check';
    return (
      <button
        type="button"
        disabled={ status !== diffOf }
        data-testid={ dataTestId }
        onClick={ () => updateStatus(otherStatus) }
      >
        {title}
      </button>
    );
  }

  const roleValidation = {
    customer: () => buildButton('Entregue', 'Em Trânsito', ' MARCAR COMO ENTREGUE'),
    seller: () => buildButton('Em Trânsito', 'Preparando', 'SAIU PARA ENTREGA'),
  };

  return (
    <div>
      <p
        data-testid={ `${role}_order_details__element-order-details-label-order-id` }
      >
        {element.id}
      </p>
      <p
        data-testid={ `${role}_order_details__element-order-details-label-seller-name` }
      >
        P. Vend:
        {element.seller.name}
      </p>
      <p
        data-testid={ `${role}_order_details__element-order-details-label-order-date` }
      >
        {element.saleDate.split('-')[2].slice(0, 2)}
        /
        {element.saleDate.split('-')[1]}
        /
        {element.saleDate.split('-')[0]}
      </p>
      <p
        data-testid={
          `${role}_order_details__element-order-details-label-delivery-status`
        }
      >
        {status}
      </p>
      {roleValidation[role]()}
      {role === 'seller'
      && (
        <button
          type="button"
          disabled={ status !== 'Pendente' }
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => updateStatus('Preparando') }
        >
          PREPARAR PEDIDO
        </button>
      )}
    </div>
  );
}

ProductDetailsNav.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
    seller: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      url_image: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired };
