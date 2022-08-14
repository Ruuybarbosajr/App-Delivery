module.exports = (user, { user: { id }, seller }) => {
  const isSellerOrOwnerUser = user.id === id || user.id === seller.id;
  const isAdm = user.role === 'administrator';
  return isAdm || isSellerOrOwnerUser;
};