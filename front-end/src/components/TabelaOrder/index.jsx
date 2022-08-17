import PropTypes from 'prop-types';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import TableHead from '../Tables/TableHead';
import TableRows from '../Tables/TableRows';

export default function TabelaOrder({ products, totalPrice }) {
  const { userData } = useContext(UserContext);
  return (
    <table>
      <TableHead />
      {products.map((item, k) => (
        <TableRows
          dataTestId="order-details"
          key={ k }
          i={ k }
          id={ item.id }
          name={ item.name }
          qtd={ item.SaleProduct.quantity }
          price={ item.price }
        />
      ))}
      <button
        data-testid={ `${userData.role}_order_details__element-order-total-price` }
        type="button"
      >
        {totalPrice.replace('.', ',')}
      </button>
    </table>
  );
}

TabelaOrder.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  })).isRequired,
  totalPrice: PropTypes.string.isRequired,
};
