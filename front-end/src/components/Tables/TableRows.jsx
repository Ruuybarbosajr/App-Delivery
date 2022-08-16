import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import removeItem from '../../helpers/removeItem';

export default function TableRows(props) {
  const { i, id, name, qtd, price, dataTestId } = props;

  const { pathname } = useLocation();
  const { setCart } = useContext(CartContext);
  function remove(productId) {
    setCart((prev) => ({ ...prev, products: removeItem(prev.products, productId) }));
  }
  return (
    <tbody>
      <tr>
        <td
          data-testid={ `customer_${dataTestId}__element-order-table-item-number-${i}` }
        >
          {i + 1}
        </td>
        <td
          data-testid={ `customer_${dataTestId}__element-order-table-name-${i}` }
        >
          {name}
        </td>
        <td
          data-testid={ `customer_${dataTestId}__element-order-table-quantity-${i}` }
        >
          {qtd}
        </td>
        <td
          data-testid={ `customer_${dataTestId}__element-order-table-unit-price-${i}` }
        >
          {price.replace('.', ',')}
        </td>
        <td
          data-testid={ `customer_${dataTestId}__element-order-table-sub-total-${i}` }
        >
          {(qtd * price).toFixed(2).replace('.', ',')}
        </td>
        {pathname.includes('checkout')
        && (
          <td>
            <button
              data-testid={ `customer_${dataTestId}__element-order-table-remove-${i}` }
              type="button"
              onClick={ () => remove(id) }
            >
              Remover
            </button>
          </td>) }
      </tr>
    </tbody>
  );
}
TableRows.propTypes = {
  i: PropTypes.number,
  name: PropTypes.string,
  qtd: PropTypes.number,
  price: PropTypes.string,
  dataTestId: PropTypes.string,
}.isRequired;
