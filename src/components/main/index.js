import React, {useCallback, useContext, useState} from 'react'
import {observer} from 'mobx-react-lite';
import AlertErrorPanel from '../alert-error-panel';
import {TodoStoreContext} from '../../stores/lottoGameStore';
import '../../assets/styles/components/_main-layout.scss';
import GameBoard from '../game-board';
import CircularButton from '../buttons/circular-button';
import Tab from '../tab';
import DefaultButton from '../buttons/default-button';
import LotteryCostSection from "../lottery-cost-section";

const Main = observer(() => {
  const [tabValue, setTabValue] = useState(0);
  const lottoGameStore = useContext(TodoStoreContext);

  const selectTabToPlay = useCallback((gameId, tabIndex) => {
    setTabValue(tabIndex);
    lottoGameStore.setActiveGameBoard(gameId);
  }, [setTabValue, lottoGameStore]);

  const onItemClicked = useCallback((number) => {
    const isSelected = lottoGameStore.activeGameBoardSelectedItems.includes(number);
    if (!isSelected) {
      lottoGameStore.selectBoardNumber(number);
    } else {
      lottoGameStore.unselectBoardNumber(number);
    }
  }, [lottoGameStore]);

  const selectSystem = useCallback((systemNumber) => {
    lottoGameStore.changeSystem(systemNumber);
  }, [lottoGameStore]);

  const clearBoard = useCallback((selectedGameBoard) => {
    lottoGameStore.clearBoard(selectedGameBoard);
  }, [lottoGameStore]);

  const randomBoardPick = useCallback((selectedGameBoard) => {
    lottoGameStore.quickPick(selectedGameBoard);
  }, [lottoGameStore]);

  const selectTabStatus = useCallback((gameId) => {
    if (lottoGameStore.lotteryGames[gameId].selectedItems.length === 0) {
      return "empty"
    } else if (lottoGameStore.lotteryGames[gameId].selectedItems.length !== lottoGameStore.lotteryGames[gameId].system) {
      return "error"
    } else {
      return "success"
    }
  }, [lottoGameStore.lotteryGames])

  return (
    <main className='main'>
      {
        lottoGameStore.lottery.error ? (
          <AlertErrorPanel message={lottoGameStore.lottery.error}/>
        ) : (
          <h1 className='main__heading'>Pick your numbers</h1>
        )
      }
      <div className='main__game-tabs-section'>
        <div className='main__game-tabs-container'>
          {Object.keys(lottoGameStore.lotteryGames).map((gameId, index) => {
            return (
              <Tab
                status={ selectTabStatus(gameId) }
                key={gameId}
                className={tabValue === index ?
                  'tab tab__selected' :
                  'tab'
                }
                label={lottoGameStore.lotteryGames[gameId].label}
                selectTabToPlay={() => {
                  selectTabToPlay(gameId, index)
                }}
              />
            )
          })
          }
          {Object.keys(lottoGameStore.lotteryGames).length < 5 && (
            <CircularButton
              id='add-game-board'
              message='+'
              onClick={() => {
                lottoGameStore.addNewDraw()
              }}
              name='add-game-board-button'
              title='Add a new game board'
              type='button'
            />
          )}
        </div>
        <div>
          <DefaultButton
            onClick={() => {
              lottoGameStore.clearAllBoards();
            }}
            type='button'
            id='clear-all-button'
            message='Clear All'
            name='clear-all-button'
            title='Clear every game board'
          />
          <DefaultButton
            onClick={() => {
              lottoGameStore.quickPickAll();
            }}
            type='button'
            id='quick-pick-all-button'
            message='Quick Pick All'
            name='Quick pick with random numbers in every game board'
            title='Clear every game board'
          />
        </div>
      </div>
      <GameBoard
        system={lottoGameStore.system}
        availableSystem={lottoGameStore.availableSystem}
        activeGameBoardSelectedItems={lottoGameStore.activeGameBoardSelectedItems}
        onItemClicked={onItemClicked}
        changeSystem={selectSystem}
        quickPick={randomBoardPick}
        clearBoard={clearBoard}
        activeGameBoard={lottoGameStore.activeGameBoard}
        selectedGameBoard={lottoGameStore.selectedGameBoard}
      />
      <LotteryCostSection
        boardCost={lottoGameStore.boardCost}
        totalCost={lottoGameStore.totalCost}
        lotteryGames={ lottoGameStore.lotteryGames }
      />
    </main>
  );
});

export default Main;
