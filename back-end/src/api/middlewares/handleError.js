module.exports = (error, _req, res, _next) => {
  const MESSAGE_ERROR_500 = 'Todo mundo erra. E dessa vez foram nossos servidores'
  if (error.status) return res.status(error.status).json({ message: error.message });
  return res.status(500).json({ message: MESSAGE_ERROR_500 });
};