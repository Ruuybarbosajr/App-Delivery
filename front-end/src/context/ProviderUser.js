import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function ProviderUser({ children }) {
  const [userData, setUserData] = useState({});
  const contextValue = useMemo(() => ({ userData,
    setUserData }), [userData]);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')));
  }, []);

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
