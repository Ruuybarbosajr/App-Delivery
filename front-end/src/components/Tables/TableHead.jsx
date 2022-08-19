import PropTypes from 'prop-types';
import TableHea from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function TableHead(props) {
  const { checkout } = props;
  return (
    <TableHea>
      <TableRow>
        <TableCell align="center">Item</TableCell>
        <TableCell align="center">Descrição</TableCell>
        <TableCell align="center">Quantidade</TableCell>
        <TableCell align="center">Valor unitário</TableCell>
        <TableCell align="center">Sub-total</TableCell>
        {checkout && <TableCell align="center">Remover item</TableCell>}
      </TableRow>
    </TableHea>
  );
}
TableHead.propTypes = {
  checkout: PropTypes.boolean,
}.isRequired;
