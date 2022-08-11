const schemaRole = (role) => {
  const roles = {
    administrator: 'administrator',
    seller: 'seller',
    customer: 'customer',
  };

  if (!roles[role]) return roles.customer;
  return roles[role];
};

module.exports = schemaRole;
