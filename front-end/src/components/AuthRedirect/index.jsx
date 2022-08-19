import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { decodeToken } from 'react-jwt';
import { useEffect, useState } from 'react';

export default function AuthRedirect({ children }) {
  const navigate = useNavigate();
  const [route, setRoute] = useState('/customer/products');
  const [isNotAuthorized, setIsNotAuthorized] = useState(true);

  useEffect(() => {
    const authorization = JSON.parse(localStorage.getItem('user'))?.token;
    const data = decodeToken(authorization);
    if (!data) return () => {};
    if (data?.role === 'seller') {
      setRoute('/seller/orders');
      setIsNotAuthorized(false);
    } else setIsNotAuthorized(false);
  }, [navigate]);

  return (
    isNotAuthorized ? children : <Navigate replaced to={ route } />
  );
}

AuthRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};
