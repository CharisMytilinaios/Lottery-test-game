import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/components/_default-button.scss';
import clsx from 'clsx';

const DefaultButton = ({message, id, name, type, title, onClick, light, small, success, disabled}) => {
  return (
    <button
      type={type}
      id={id}
      onClick={ onClick }
      disabled={ disabled }
      title={title}
      name={name}
      className={ clsx('default-button', {
        'default-button__light': light,
        'default-button__small': small,
        'default-button__success': success
      })}
    >
      <span>{message}</span>
    </button>
  );
};

DefaultButton.propTypes = {
  message: PropTypes.string.isRequired,
  light: PropTypes.bool,
  small: PropTypes.bool,
  success: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default DefaultButton;
