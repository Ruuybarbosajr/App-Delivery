import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonForm({ datatest, name, disabled, click }) {
  return (
    <button
      type="button"
      data-testid={ datatest }
      disabled={ disabled }
      onClick={ click }
    >
      {name}
    </button>
  );
}

ButtonForm.propTypes = {
  name: PropTypes.string.isRequired,
  datatest: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
};
