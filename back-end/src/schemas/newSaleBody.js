const joi = require('joi');

const schemaNewSale = joi.object({
  sellerId: joi.number().min(1).required(),
  totalPrice: joi.number().min(0).required(),
  deliveryAddress: joi.string().required(),
  deliveryNumber: joi.string().required(),
  products: joi.array().items(
    joi.object({
      name: joi.string(),
      price: joi.string(),
      id: joi.number().min(1).required(),
      qtd: joi.number().min(1).required(),
    }).required(),
  ).required(),
});

module.exports = schemaNewSale;
