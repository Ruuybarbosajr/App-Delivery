import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { decodeToken } from 'react-jwt';
import { useEffect, useState } from 'react';

export default function AuthToken({ children }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const authorization = JSON.parse(localStorage.getItem('user'))?.token;
    const data = decodeToken(authorization);
    if (data) setIsAuthorized(true);
    else setIsAuthorized(false);
  }, [navigate]);

  return (
    isAuthorized ? children : <Navigate replaced to="../login" />
  );
}

AuthToken.propTypes = {
  children: PropTypes.node.isRequired,
};
