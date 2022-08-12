module.exports = (products, salesId) => products.map((product) => ({
  salesId,
  productsId: product.id,
  price: product.price,
}));