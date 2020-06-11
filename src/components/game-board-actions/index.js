import React from 'react';
import {observer} from 'mobx-react-lite';
import PropTypes from 'prop-types';
import DefaultButton from '../buttons/default-button';
import '../../assets/styles/components/_game-board-actions.scss';

const GameBoardActions = observer(({ clearBoard, quickPick, activeGameBoard }) => {
  return (
    <section className='game-board-actions'>
      <div className='game-board-actions__button-container'>
        <DefaultButton
          onClick={ () => {
            clearBoard(activeGameBoard);
          } }
          light
          id='clear-button'
          message='Clear'
          name='clear-button'
          title='Clear the game board'
          type='button'
        />
      </div>
      <div className='game-board-actions__button-container'>
        <DefaultButton
          onClick={() => {
            quickPick(activeGameBoard);
          }}
          light
          id='quick-pick-button'
          message='Quick Pick'
          name='quick-pick-button'
          title='Quick pick with random number in your game board'
          type='button'
        />
      </div>
    </section>
  );
});

GameBoardActions.propTypes = {
  clearBoard: PropTypes.func.isRequired,
  quickPick: PropTypes.func.isRequired,
  activeGameBoard: PropTypes.string.isRequired
}

export default GameBoardActions;
