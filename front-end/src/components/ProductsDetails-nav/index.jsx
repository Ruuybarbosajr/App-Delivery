import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import style from './index.module.css';
import UserContext from '../../context/UserContext';

const axios = require('axios');

export default function ProductDetailsNav({ element }) {
  const [status, setStatus] = useState(element.status);
  const { userData: { role } } = useContext(UserContext);

  async function updateStatus(saleStatus) {
    try {
      await axios.patch(`http://localhost:3001/sales/${element.id}/update`, { status: saleStatus }, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('user'))?.token,
        } });
      setStatus(saleStatus);
    } catch (error) {
      console.error(error);
    }
  }

  function buildButton(otherStatus, diffOf, title) {
    return (
      <div>
        <button
          type="button"
          className={ style.button_status }
          disabled={ status !== diffOf }
          onClick={ () => updateStatus(otherStatus) }
        >
          {title}
        </button>
      </div>
    );
  }

  const roleValidation = {
    customer: () => buildButton('Entregue', 'Em Trânsito', ' MARCAR COMO ENTREGUE'),
    seller: () => buildButton('Em Trânsito', 'Preparando', 'SAIU PARA ENTREGA'),
  };

  return (
    <div className={ style.container__body }>
      <div className={ style.container__title }>
        <h1>Detalhes do pedido</h1>
      </div>
      <div className={ style.container__header }>
        <div className={ style.container__data_sales }>
          <div className={ style.container__info }>
            <p>
              COD:
            </p>
            <p>
              {element.id}
            </p>
          </div>
          <div className={ style.container__info }>
            <p>
              Pessoa Vendedora:
            </p>
            <p>
              {element.seller.name}
            </p>
          </div>
          <div className={ style.container__info }>
            <p>
              Data:
            </p>
            <p>
              {element.saleDate.split('-')[2].slice(0, 2)}
              /
              {element.saleDate.split('-')[1]}
              /
              {element.saleDate.split('-')[0]}
            </p>
          </div>
        </div>
        <div className={ style.container__status }>
          <div>
            <p className={ style[status.replace(' ', '')] }>
              {status}
            </p>
          </div>
          <div className={ style.container__buttons_status }>
            {roleValidation[role]()}
            {role === 'seller'
      && (
        <div>
          <button
            className={ style.button_status }
            type="button"
            disabled={ status !== 'Pendente' }
            onClick={ () => updateStatus('Preparando') }
          >
            PREPARAR PEDIDO
          </button>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetailsNav.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
    seller: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      url_image: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired };
