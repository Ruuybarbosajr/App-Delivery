import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function OrderItem({ id, status, data, totalPrice }) {
  const { userData: { role } } = useContext(UserContext);
  return (
    <div>
      <Link to={ `/${role}/orders/${id}` }>
        <p data-testid={ `${role}_orders__element-order-id-${id}` }>
          Pedido:
          {id}
        </p>
        <p
          data-testid={ `${role}_orders__element-delivery-status-${id}` }
        >
          {status}
        </p>
        <p
          data-testid={ `${role}_orders__element-order-date-${id}` }
        >
          {data.split('-')[2].slice(0, 2)}
          /
          {data.split('-')[1]}
          /
          {data.split('-')[0]}
        </p>
        <p
          data-testid={ `${role}_orders__element-card-price-${id}` }
        >
          {totalPrice.replace('.', ',')}

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
};
