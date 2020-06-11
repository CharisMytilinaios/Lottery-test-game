import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import PropTypes from 'prop-types';
import '../../assets/styles/components/_lottery-cost-section.scss';
import DefaultButton from '../buttons/default-button';

const LotteryCostSection = observer(({ boardCost, totalCost, lotteryGames }) => {

  const ticketIsReady = useCallback(() => {
    let isTicketValid = true;
    Object.keys(lotteryGames).forEach((lotteryGameKey) => {
      if(lotteryGames[lotteryGameKey].selectedItems.length !== lotteryGames[lotteryGameKey].system) {
        isTicketValid = false;
      }
    });
    return isTicketValid;
  }, [lotteryGames])

  return (
    <section className='lottery-cost-section'>
      <div className='lottery-cost-section__price-labels'>
        <span className='lottery-cost-section__board-price'>
          Board Price ${(Math.round(boardCost * 100) / 100).toFixed(2)}
        </span>
        <span className='lottery-cost-section__total-price'>
          Total Price ${(Math.round(totalCost * 100) / 100).toFixed(2)}
        </span>
      </div>
      <DefaultButton
        small
        success={ ticketIsReady() }
        disabled={ !ticketIsReady() }
        id='play-all-button'
        message='Play All'
        name='play-all-button'
        title='Play all boards'
        type='button'
      />
    </section>
  );
});

LotteryCostSection.propTypes = {
  boardCost: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  lotteryGames: PropTypes.object.isRequired
}

export default LotteryCostSection;
