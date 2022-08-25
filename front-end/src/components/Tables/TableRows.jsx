import PropTypes from 'prop-types';
import { useContext } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useLocation } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import CartContext from '../../context/CartContext';
import removeItem from '../../helpers/removeItem';
import style from './style.module.css';

export default function TableRows(props) {
  const { i, id, name, qtd, price } = props;
  const { pathname } = useLocation();
  const { setCart } = useContext(CartContext);

  function remove(productId) {
    setCart((prev) => ({ ...prev, products: removeItem(prev.products, productId) }));
  }

  return (
    <TableBody>
      <TableRow sx={ { '&:last-child td, &:last-child th': { border: -1 } } }>
        <TableCell align="center">
          {i + 1}
        </TableCell>
        <TableCell align="center">
          {name}
        </TableCell>
        <TableCell align="center">
          {qtd}
        </TableCell>
        <TableCell align="center">
          {price.replace('.', ',')}
        </TableCell>
        <TableCell align="center">
          {(qtd * Number(price)).toFixed(2).replace('.', ',')}
        </TableCell>
        {pathname.includes('checkout')
        && (
          <TableCell align="center">
            <button
              className={ style.button__remove }
              type="button"
              onClick={ () => remove(id) }
            >
              <BiTrash />
            </button>
          </TableCell>)}
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
