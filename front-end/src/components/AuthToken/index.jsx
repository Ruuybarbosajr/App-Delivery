import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthToken({ children }) {
  const authorization = JSON.parse(localStorage.getItem('user'))?.token;

  // useEffect(() => {
  //   const authorization = JSON.parse(localStorage.getItem('user'))?.token;
  // }, []);

  return (
    !authorization ? <Navigate to="../login" /> : children
  );
}

AuthToken.propTypes = {
  children: PropTypes.node.isRequired,
};
