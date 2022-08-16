import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from '../Header/index.module.css';

const axios = require('axios');

export default function ProductDetailsNav({ element }) {
  const dataId = 'customer_order_details__element-order-details-label-delivery-status';
  const [status, setStatus] = useState(element.status);

  async function updateStatus() {
    try {
      const accessToken = JSON.parse(localStorage.getItem('user'));
      await axios.patch(`http://localhost:3001/sales/${element.id}/update`, { status: 'Entregue' }, {
        headers: {
          authorization: accessToken.token,
        } });
      setStatus('Entregue');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <nav className={ styles.navbar }>
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {element.id}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vend:
          {element.seller.name}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {element.saleDate.split('-')[2].slice(0, 2)}
          /
          {element.saleDate.split('-')[1]}
          /
          {element.saleDate.split('-')[0]}
        </p>
        <p
          data-testid={ dataId }
        >
          {status}

        </p>
        <button
          type="button"
          disabled={ status !== 'Em Trânsito' }
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => updateStatus() }
        >
          MARCAR COMO ENTREGUE
        </button>
      </nav>
    </div>
  );
}

ProductDetailsNav.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
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
