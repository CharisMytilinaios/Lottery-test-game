import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/components/_tab.scss';
import clsx from "clsx";

const Tab = ({selectTabToPlay, label, className, status}) => {
  return (
    <div
      onClick={selectTabToPlay}
      className={className}
    >
      <span className={clsx('tab__status', {
        'tab__status--error': status ==='error',
        'tab__status--success': status === 'success'
      })
      }/>
      <span>{label}</span>
    </div>
  );
};

Tab.propTypes = {
  selectTabToPlay: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default Tab;
