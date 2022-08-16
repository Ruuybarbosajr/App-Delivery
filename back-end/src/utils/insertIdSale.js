module.exports = (products, saleId) => products.map(({ id, qtd }) => ({
  saleId,
  productId: id,
  quantity: qtd,
}));