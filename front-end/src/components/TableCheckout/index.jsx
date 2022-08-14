import { useEffect, useState, useContext } from 'react';
import CartContext from '../../context/cartContext';

export default function TableCheckout() {
  const { cart, setCart } = useContext(CartContext);
  // const cartStorage = JSON.parse(localStorage.getItem('cart'));
  const [value, setValue] = useState('0,00');

  function verCarrinho() {
    const valor = cart.reduce(
      (acc, product) => acc + product.qtd * product.price,
      0,
    );
    setValue(valor.toFixed(2));
  }

  function removeItem(name) {
    const a = cart.filter((product) => product.name !== name);
    setCart(a);
    localStorage.setItem('cart', JSON.stringify(a));
    console.log(a);
    return a;
  }

  useEffect(() => {
    verCarrinho();
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

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
        {cart
          && cart.map((p, k) => (
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
                  onClick={ () => removeItem(p.name) }
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
        {value.replace('.', ',')}

      </button>
    </div>
  );
}
