import React from 'react';
import {observer} from 'mobx-react-lite';
import PropTypes from 'prop-types';
import '../../assets/styles/components/_game-board.scss';
import SystemSelection from "../system-selection";
import GameBoardActions from "../game-board-actions";

const GameBoard = observer(
  ({
     selectedGameBoard,
     onItemClicked,
     activeGameBoardSelectedItems,
     system,
     availableSystem,
     changeSystem,
     clearBoard,
     quickPick,
    activeGameBoard
   }) => {

    return (
      <section className='game-board'>
        <div className='game-board__game-container'>
          {selectedGameBoard.map((number, index) => {
            return (
              <div
                key={Math.random() + index}
                onClick={() => {
                  onItemClicked(number)
                }}
                className={activeGameBoardSelectedItems.includes(number) ?
                  'game-board__lotto-number game-board__lotto-number--selected' :
                  'game-board__lotto-number'
                }>
                {number}
              </div>
            )
          })}
          {Array(10 - (selectedGameBoard.length % 10)).fill(0).map(() => {
            //  Fill the table with empty elements to retain the format of columns
            return (
              <div
                key={Math.random()}
                className='game-board__empty-element'
              />
            )
          })}
        </div>
        <SystemSelection
          changeSystem={changeSystem}
          availableSystem={availableSystem}
          system={system}
        />
        <GameBoardActions
          activeGameBoard={ activeGameBoard }
          quickPick={ quickPick }
          clearBoard={clearBoard}
        />
      </section>
    );
  });

GameBoard.propTypes = {
  selectedGameBoard: PropTypes.array.isRequired,
  onItemClicked: PropTypes.func.isRequired,
  activeGameBoardSelectedItems: PropTypes.array.isRequired,
  availableSystem: PropTypes.array.isRequired,
  system: PropTypes.number.isRequired,
  changeSystem: PropTypes.func.isRequired,
  clearBoard: PropTypes.func.isRequired,
  quickPick: PropTypes.func.isRequired,
  activeGameBoard: PropTypes.string.isRequired
}

export default GameBoard;
