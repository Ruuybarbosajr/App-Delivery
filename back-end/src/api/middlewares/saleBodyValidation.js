const schemaNewSale = require('../../schemas/newSaleBody');
const generateError = require('../../utils/generateError');

module.exports = (req, res, next) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
  const { error } = schemaNewSale.validate(
    { sellerId, totalPrice, deliveryAddress, deliveryNumber, products },
  );
  if (error) next(generateError(400, error.message));
  next();
};