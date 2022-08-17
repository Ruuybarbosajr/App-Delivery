const generateError = require('../../utils/generateError');
const schemaRegister = require('../../schemas/registerBody');

module.exports = (req, _res, next) => {
  const { name, email, password } = req.body;
  const { error } = schemaRegister.validate({ name, email, password });
  if (error) return next(generateError(400, 'Algo de errado não está certo'));
  next();
};
