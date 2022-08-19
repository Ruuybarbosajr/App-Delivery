/* eslint-disable react/no-multi-comp */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { MenuItem, Select } from '@mui/material';
import style from './style.module.css';
import CartContext from '../../context/CartContext';

const axios = require('axios');

function FormCheckout() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { cart } = useContext(CartContext);
  const [sellers, setSellers] = useState([]);

  const [sale, setSale] = useState({
    sellerId: '',
    deliveryAddress: '',
    deliveryNumber: '',
  });

  async function getSellerId() {
    try {
      const getSellers = await axios.get('http://localhost:3001/user/seller/all', {
        headers: {
          authorization: JSON.parse(localStorage.getItem('user'))?.token,
        },
      });

      setSellers(getSellers.data);
      const [seller] = getSellers.data;
      setSale((prev) => ({ ...prev, sellerId: seller.id }));
    } catch (error) {
      console.log(error);
    }
  }

  async function getId() {
    try {
      const { products, totalPrice } = cart;
      const { data } = await axios.post('http://localhost:3001/sales/register', {
        ...sale, products, totalPrice,
      }, {
        headers: {
          authorization: JSON.parse(localStorage.getItem('user'))?.token,
        },
      });
      navigate(`/customer/orders/${data}`);
      localStorage.setItem('cart', JSON.stringify({ products: [], totalPrice: '0.00' }));
    } catch (error) {
      enqueueSnackbar('Campo inválido', { variant: 'error' });
      console.error(error);
    }
  }

  useEffect(() => {
    getSellerId();
  }, []);

  return (
    <form className={ style.container__form }>
      <h1>Detalhes para entrega</h1>
      <div className={ style.container__details }>
        <div className={ style.container__select }>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={ sale.sellerId }
            label="P.Vendedora Responsável"
            onChange={ (e) => setSale((prev) => (
              { ...prev, sellerId: e.target.value })) }
          >
            { sellers.map((s) => (
              <MenuItem key={ s.id } value={ s.id }>{s.name}</MenuItem>
            ))}
          </Select>
        </div>
        <div className={ style.container__address }>
          <TextField
            value={ sale.deliveryAddress }
            label="Endereço"
            type="text"
            onChange={ (e) => setSale((prev) => (
              { ...prev, deliveryAddress: e.target.value })) }
          />
        </div>
        <div className={ style.container__number }>
          <TextField
            value={ sale.deliveryNumber }
            label="Número"
            type="text"
            onChange={ (e) => setSale((prev) => (
              { ...prev, deliveryNumber: e.target.value })) }
          />
        </div>
        <button
          disabled={ !cart.products.length }
          className={ style.button__finish_sale }
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => getId() }
          type="button"
        >
          Finalizar pedido
        </button>
      </div>
    </form>
  );
}

export default function IntergrationNotistack() {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <FormCheckout />
    </SnackbarProvider>
  );
}
