import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import removeItem from '../../helpers/removeItem';

export default function TableCheckout() {
  const { cart, setCart } = useContext(CartContext);

  function remove(id) {
    setCart((prev) => ({ ...prev, products: removeItem(prev.products, id) }));
  }

  return (
    <div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Sub total</th>
          <th>Remover item</th>
        </tr>
        {cart.products.map((p, k) => (
          <tr key={ k }>
            <td
              data-testid={ `customer_checkout__element-order-table-item-number-${k}` }
            >
              {k + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${k}` }

            >
              {p.name}

            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${k}` }
            >
              {p.qtd}

            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-unit-price-${k}` }
            >
              {p.price.replace('.', ',')}

            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-sub-total-${k}` }
            >
              {(p.qtd * p.price).toFixed(2).replace('.', ',')}

            </td>

            <td>
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${k}` }
                type="button"
                onClick={ () => remove(p.id) }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </table>
      <button
        data-testid="customer_checkout__element-order-total-price"
        type="button"
      >
        {cart.totalPrice.replace('.', ',')}
      </button>
    </div>
  );
}
