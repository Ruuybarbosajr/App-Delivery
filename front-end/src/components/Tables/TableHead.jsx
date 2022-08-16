import PropTypes from 'prop-types';

export default function TableHead(props) {
  const { checkout } = props;
  return (
    <thead>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor unitário</th>
        <th>Sub-total</th>
        {checkout && <th>Remover item</th>}
      </tr>
    </thead>
  );
}
TableHead.propTypes = {
  checkout: PropTypes.boolean,
}.isRequired;
