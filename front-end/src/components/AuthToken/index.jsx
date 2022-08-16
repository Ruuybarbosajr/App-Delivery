import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthToken({ children }) {
  const authorization = localStorage.getItem('user');

  return (
    !authorization ? <Navigate to="../login" /> : children
  );
}

AuthToken.propTypes = {
  children: PropTypes.node.isRequired,
};
