module.exports = (products) => {
  const productsWithModifiedPrice = products.map(({ dataValues }) => {
    return {
      ...dataValues,
      price: dataValues.price.replace('.',','),
    }
  });
  return productsWithModifiedPrice;
}