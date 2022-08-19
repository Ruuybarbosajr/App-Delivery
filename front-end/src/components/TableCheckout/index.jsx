import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CartContext from '../../context/CartContext';
import TableHead from '../Tables/TableHead';
import TableRows from '../Tables/TableRows';

export default function TableCheckout() {
  const { cart } = useContext(CartContext);

  return (
    <TableContainer component={ Paper }>
      <Table sx={ { minWidth: 650 } } size="small" aria-label="a dense table">
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
      </Table>
    </TableContainer>
  );
}
