import React from 'react';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';


const AlertErrorPanel = ({ message }) => {
  return (
    <Alert variant="filled" severity="error">
      { message }
    </Alert>
  );
};

AlertErrorPanel.propTypes = {
  message: PropTypes.string.isRequired
}

export default AlertErrorPanel;
