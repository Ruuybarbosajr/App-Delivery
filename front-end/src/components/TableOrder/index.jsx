import { useContext } from 'react';
import Table from '@mui/material/Table';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartContext from '../../context/CartContext';
import TableHead from '../Tables/TableHead';
import TableRows from '../Tables/TableRows';
import configPrice from '../../helpers/configPrice';
import style from './style.module.css';

export default function TableOrder({ products, totalPrice }) {
  const { cart } = useContext(CartContext);
  const { pathname } = useLocation();

  const PRODUCTS = products || cart.products;
  const TOTAL_PRICE = totalPrice || cart.totalPrice;

  return (
    <div className={ style.container__table }>
      <div className={ style.container__title }>
        <h1>Pedidos</h1>
      </div>
      <Table sx={ { minWidth: 650 } } size="small" aria-label="a dense table">
        <TableHead checkout={ pathname.includes('checkout') } />
        {PRODUCTS.map((item, k) => (
          <TableRows
            key={ k }
            i={ k }
            id={ item.id }
            name={ item.name }
            qtd={ item.qtd || item.SaleProduct.quantity }
            price={ item.price }
          />
        ))}
      </Table>
      <div className={ style.container__button }>
        <button
          type="button"
        >
          Total:
          {' '}
          {configPrice(TOTAL_PRICE)}
        </button>
      </div>
    </div>
  );
}

TableOrder.defaultProps = {
  products: null,
  totalPrice: 0,
};

TableOrder.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
    SaleProduct: PropTypes.shape({
      quantity: PropTypes.number,
    }),
  })),
  totalPrice: PropTypes.number,
};
