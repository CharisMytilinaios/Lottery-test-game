import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/components/_circular-button.scss';

const CircularButton = ({ message, id, name, type, title, onClick }) => {
  return (
    <button
      type={type}
      id={ id }
      onClick={ onClick }
      title={ title }
      name={ name }
      className='circular-button'
    >
      <span className='circular-button__text'>{ message }</span>
    </button>
  );
};

CircularButton.propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default CircularButton;
