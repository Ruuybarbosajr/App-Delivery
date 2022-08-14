import FormCheckout from '../../components/FormCheckout';
import Header from '../../components/Header/index';
import TableCheckout from '../../components/TableCheckout';

export default function CheckoutWide() {
  return (
    <>
      <Header />
      <h1>Finalizar pedido:</h1>
      <TableCheckout />
      <FormCheckout />
    </>
  );
}
