import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import TableHea from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import style from './index.module.css';
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
    <Table sx={ { minWidth: 650 } } size="small" aria-label="a dense table">
      <TableHea>
        <TableRow sx={ { '&:last-child td, &:last-child th': { border: -1 } } }>
          <TableCell
            data-testid={ `${role}_order_details__element-order-details-label-order-id` }
          >
            {element.id}
          </TableCell>
          <TableCell>
            P. Vend:
            {element.seller.name}
          </TableCell>
          <TableCell>
            {element.saleDate.split('-')[2].slice(0, 2)}
            /
            {element.saleDate.split('-')[1]}
            /
            {element.saleDate.split('-')[0]}
          </TableCell>
          <TableCell
            data-testid={
              `${role}_order_details__element-order-details-label-delivery-status`
            }
          >
            {status}
          </TableCell>
          {roleValidation[role]()}
          {role === 'seller'
      && (
        <TableCell>
          <button
            type="button"
            disabled={ status !== 'Pendente' }
            data-testid="seller_order_details__button-preparing-check"
            onClick={ () => updateStatus('Preparando') }
            className={ style.container__button }
          >
            PREPARAR PEDIDO
          </button>
        </TableCell>
      )}
        </TableRow>

      </TableHea>
    </Table>

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
