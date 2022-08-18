import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function OrderItem({ id, status, data, totalPrice, index }) {
  const ten = 10;
  return (
    <div>
      <Link to={ `/customer/orders/${id}` }>
        <p data-testid={ `customer_orders__element-order-id-${index}` }>
          Pedido:
          {id}
        </p>
        <p
          data-testid={ `customer_orders__element-delivery-status-${index}` }
        >
          {status}
        </p>
        <p
          data-testid={ `customer_orders__element-order-date-${index}` }
        >
          {data.slice(0, ten).split('-')}
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-${index}` }
        >
          {totalPrice}

        </p>
      </Link>
    </div>
  );
}

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
