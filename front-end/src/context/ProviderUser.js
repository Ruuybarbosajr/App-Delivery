import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function ProviderUser({ children }) {
  const [loginUser, setLoginUser] = useState({});

  const contextValue = useMemo(() => ({ loginUser,
    setLoginUser }), [loginUser]);

  return (
    <UserContext.Provider value={ contextValue }>
      {children}
    </UserContext.Provider>
  );
}

ProviderUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderUser;
