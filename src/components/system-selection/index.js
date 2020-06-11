import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react-lite';
import '../../assets/styles/components/_system-selection.scss';

const SystemSelection = observer(({availableSystem, system, changeSystem}) => {
  return (
    <section className='system-selection'>
      <span className='system-selection__title'>System</span>
      <div className='system-selection__system-numbers-container'>
        {availableSystem.map((systemNumber) => {
          return (
            <div
              key={Math.random() + systemNumber}
              onClick={ () => {
                changeSystem(systemNumber);
              } }
              className={ systemNumber === system ?
                'system-selection__number system-selection__number--selected' :
                'system-selection__number'
              }
            >
              <span>{systemNumber}</span>
            </div>
          )
        })}
      </div>
    </section>
  );
});

SystemSelection.propTypes = {
  availableSystem: PropTypes.array.isRequired,
  system: PropTypes.number.isRequired,
  changeSystem: PropTypes.func.isRequired
}

export default SystemSelection;
