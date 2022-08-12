module.exports = (products) => {
  const productsWithModifiedPrice = products.map(({ dataValues }) => ({
      ...dataValues,
      price: dataValues.price.replace('.', ','),
  }));
  return productsWithModifiedPrice;
};
