import React from 'react';
import PropTypes from 'prop-types';

export default function InputForm({
  labelHtml,
  labelName,
  type,
  name,
  id,
  testId,
  handleChange,
}) {
  return (
    <label htmlFor={ labelHtml }>
      {' '}
      {labelName}
      <input
        type={ type }
        name={ name }
        id={ id }
        data-testid={ testId }
        onChange={ handleChange }
      />
    </label>
  );
}

InputForm.propTypes = {
  labelHtml: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
