module.exports = (products, saleId) => products.map((product) => ({
  saleId,
  productId: product.id,
  ...product,
}))