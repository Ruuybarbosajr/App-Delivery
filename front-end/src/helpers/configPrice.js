export default (price) => Number(price)
  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
