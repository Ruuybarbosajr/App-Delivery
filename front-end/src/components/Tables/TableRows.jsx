import PropTypes from 'prop-types';
import { useContext } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useLocation } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContext';
import removeItem from '../../helpers/removeItem';

export default function TableRows(props) {
  const { i, id, name, qtd, price, dataTestId } = props;
  const { userData: { role } } = useContext(UserContext);
  const { pathname } = useLocation();
  const { setCart } = useContext(CartContext);
  function remove(productId) {
    setCart((prev) => ({ ...prev, products: removeItem(prev.products, productId) }));
  }
  return (
    <TableBody>
      <TableRow sx={ { '&:last-child td, &:last-child th': { border: -1 } } }>
        <TableCell
          data-testid={ `${role}_${dataTestId}__element-order-table-item-number-${i}` }
          align="center"
        >
          {i + 1}
        </TableCell>
        <TableCell
          data-testid={ `${role}_${dataTestId}__element-order-table-name-${i}` }
          align="center"
        >
          {name}
        </TableCell>
        <TableCell
          data-testid={ `${role}_${dataTestId}__element-order-table-quantity-${i}` }
          align="center"
        >
          {qtd}
        </TableCell>
        <TableCell
          data-testid={ `${role}_${dataTestId}__element-order-table-unit-price-${i}` }
          align="center"
        >
          {price.replace('.', ',')}
        </TableCell>
        <TableCell
          data-testid={ `${role}_${dataTestId}__element-order-table-sub-total-${i}` }
          align="center"
        >
          {(qtd * price).toFixed(2).replace('.', ',')}
        </TableCell>
        {pathname.includes('checkout')
        && (
          <TableCell align="center">
            <button
              data-testid={ `${role}_${dataTestId}__element-order-table-remove-${i}` }
              type="button"
              onClick={ () => remove(id) }
            >
              Remover
            </button>
          </TableCell>) }
      </TableRow>
    </TableBody>
  );
}
TableRows.propTypes = {
  i: PropTypes.number,
  name: PropTypes.string,
  qtd: PropTypes.number,
  price: PropTypes.string,
  dataTestId: PropTypes.string,
}.isRequired;
