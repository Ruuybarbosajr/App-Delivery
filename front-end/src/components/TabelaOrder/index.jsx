import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import TableHead from '../Tables/TableHead';
import TableRows from '../Tables/TableRows';

export default function TabelaOrder() {
  const { cart } = useContext(CartContext);

  return (
    <table>
      <TableHead />
      {cart.products.map((item, k) => (
        <TableRows
          dataTestId="order-details"
          key={ k }
          i={ k }
          id={ item.id }
          name={ item.name }
          qtd={ item.qtd }
          price={ item.price }
        />
      ))}
      <button
        data-testid="customer_order_details__element-order-total-price"
        type="button"
      >
        {cart.totalPrice.replace('.', ',')}
      </button>
    </table>
  );
}
