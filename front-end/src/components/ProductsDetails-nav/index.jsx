import PropTypes from 'prop-types';
import styles from '../Header/index.module.css';

export default function productDetailsNav({ element }) {
  const id1 = 'customer_order_details__element-order-details-label-order-id';
  const id2 = 'customer_order_details__element-order-details-label-seller-name';
  const id3 = 'customer_order_details__element-order-details-label-order-date';
  // verificar se esse index será o id passado por param
  const id4 = 'customer_order_details__element-order-table-item-number-<index>';
  const id5 = 'customer_order_details__element-order-table-name-<index>';
  return (
    <div>
      <nav className={ styles.navbar }>
        <p data-testid={ id1 }>{element.nDoPedido}</p>
        <p data-testid={ id2 }>{element.vendedora}</p>
        <p data-testid={ id3 }>{element.data}</p>
        <p data-testid={ id4 }>{element.status}</p>
        <p data-testid={ id5 }>{element.statusPedido}</p>
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
