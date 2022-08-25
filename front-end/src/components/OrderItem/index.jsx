import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import style from './style.module.css';
import configPrice from '../../helpers/configPrice';

export default function OrderItem({ id, status, data, totalPrice }) {
  const { userData: { role } } = useContext(UserContext);

  return (
    <Link
      className={ `${style.container__card} ${style[status.replace(' ', '')]}` }
      to={ `/${role}/orders/${id}` }
    >
      <p
        className={ style.container__cod }
      >
        Cod:
        {' '}
        {id}
      </p>
      <div className={ style.container__info }>
        <p
          className={ style.container__status }
        >
          {status}
        </p>
        <p
          className={ style.container__data }
        >
          {data.split('-')[2].slice(0, 2)}
          /
          {data.split('-')[1]}
          /
          {data.split('-')[0]}
        </p>
      </div>
      <p
        className={ style.container__totalPrice }
      >
        {configPrice(totalPrice)}
      </p>
    </Link>
  );
}

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};
