import PropTypes from 'prop-types';
import styles from '../Header/index.module.css';

const axios = require('axios');

export default function productDetailsNav({ element }) {
  const id1 = 'customer_order_details__element-order-details-label-order-id';
  const id2 = 'customer_order_details__element-order-details-label-seller-name';
  const id3 = 'customer_order_details__element-order-details-label-order-date';
  const id4 = 'customer_order_details__element-order-table-item-number-<index>';
  const id5 = 'customer_order_details__element-order-table-name-<index>';

  function updateStatus() {
    console.log(' passou aqui');
    const accessToken = JSON.parse(localStorage.getItem('user'));
    axios.patch(`http://localhost:3001/sales/${element.id}/update`, { status: 'Entregue' }, {
      headers: {
        authorization: accessToken.token,
      } });
    return '';
  }
  return (
    <div>
      <nav className={ styles.navbar }>
        <p data-testid={ id1 }>{element.id}</p>
        <p data-testid={ id2 }>{element.seller.name}</p>
        <p data-testid={ id3 }>{element.saleDate}</p>
        <p data-testid={ id4 }>{element.status}</p>
        <button
          type="button"
          data-testid={ id5 }
          onClick={ () => updateStatus() }
        >
          MARCAR COMO ENTREGUE
        </button>
      </nav>
    </div>
  );
}

productDetailsNav.propTypes = {
  element: PropTypes.shape({
    nDoPedido: PropTypes.number,
    vendedora: PropTypes.string,
    status: PropTypes.string,
    statusPedido: PropTypes.string,
    data: PropTypes.string,
  }).isRequired,
};
