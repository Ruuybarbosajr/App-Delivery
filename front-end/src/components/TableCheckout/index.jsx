import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import TableHead from '../Tables/TableHead';
import TableRows from '../Tables/TableRows';

export default function TableCheckout() {
  const { cart } = useContext(CartContext);

  return (
    <table>
      <TableHead checkout />
      {cart.products.map((item, k) => (
        <TableRows
          dataTestId="checkout"
          key={ k }
          i={ k }
          id={ item.id }
          name={ item.name }
          qtd={ item.qtd }
          price={ item.price }
        />
      ))}
      <button
        data-testid="customer_checkout__element-order-total-price"
        type="button"
      >
        {cart.totalPrice.replace('.', ',')}
      </button>
    </table>
  );
}
