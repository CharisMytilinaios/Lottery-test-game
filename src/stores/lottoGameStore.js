import {action, computed, decorate, observable} from 'mobx';
import { createContext } from 'react';
import { arrayShuffle, nCk } from '../helpers/utilityFunctions';

/**
 * Class describing our Lotto Game store with
 * its configuration state, actions, and computed properties
 */
class LotteryStore {

  /**
   *  Default state and existing configuration of lottery main game
   * @type {{ticket: {games: {game1: {system: number, boardCost: number, id: string, label: string, board: number[], selectedItems: [], availableSystem: number[]}, game3: {system: number, boardCost: number, id: string, label: string, board: number[], selectedItems: [], availableSystem: number[]}, game2: {system: number, boardCost: number, id: string, label: string, board: number[], selectedItems: [], availableSystem: number[]}}, ticketCost: number}, activeGameBoard: string, error: string}}
   */
  lottery = {
    ticket: {
      games: {
        game1: {
          id: 'game1',
          label: 'Game 1',
          availableSystem: [6, 7, 8, 9],
          system: 6,
          board: Array(49).join(0).split(0).map((v, i) => i + 1),
          selectedItems: [],
          boardCost: 0.00
        },
        game2: {
          id: 'game2',
          label: 'Game 2',
          availableSystem: [6, 7, 8, 9],
          system: 6,
          board: Array(49).join(0).split(0).map((v, i) => i + 1),
          selectedItems: [],
          boardCost: 0.00
        },
        game3: {
          id: 'game3',
          label: 'Game 3',
          availableSystem: [6, 7, 8, 9],
          system: 6,
          board: Array(49).join(0).split(0).map((v, i) => i + 1),
          selectedItems: [],
          boardCost: 0.00
        }
      },
      ticketCost: 0.00
    },
    activeGameBoard: 'game1',
    error: '',
  };

  // Actions

  /**
   * Adds a new game board in our existing lottery game
   */
  addNewDraw() {
    // Total Game boards
    const totalGames = Object.keys(this.lotteryGames).length;
    // Next game board id
    const nextGameId = `game${ totalGames + 1 }`;
    // Next Game Board label to display
    const nextGameLabel = `Game ${ totalGames + 1 }`
    // setup game Board configuration
    this.lotteryGames[nextGameId] = {
      id: nextGameId,
      label:  nextGameLabel,
      availableSystem: [6, 7, 8, 9],
      system: 6,
      board: Array(49).join(0).split(0).map((v, i) => i + 1),
      selectedItems: [],
      boardCost: 0
    }
  }

  /**
   * Changes the system of a specific game board
   * @param systemNumber: number
   */
  changeSystem(systemNumber) {
    this.lotteryGames[this.activeGameBoard].system = systemNumber;
    this.validateAndCalculateCost(this.activeGameBoard);
  }

  /**
   * Changes our current playable game board
   * @param gameId
   */
  setActiveGameBoard(gameId) {
    this.lottery.activeGameBoard = gameId;
    this.validateAndCalculateCost(gameId);
  }

  /**
   * Selects a specific number from our current game board
   * @param boardNumber
   */
  selectBoardNumber(boardNumber) {
    this.activeGameBoardSelectedItems.push(boardNumber);
    // validate if the is any error and recalculate total cost and active game board cost
    this.validateAndCalculateCost(this.activeGameBoard);
  }

  /**
   * Unselects if it is selected a specific number from our current game board
   * @param boardNumber
   */
  unselectBoardNumber(boardNumber) {
    this.lotteryGames[this.activeGameBoard].selectedItems = this.activeGameBoardSelectedItems.filter((number) => {
      return boardNumber !== number;
    });
    // validate if the is any error and recalculate total cost and active game board cost
    this.validateAndCalculateCost(this.activeGameBoard);
  }

  /**
   *  Clears our current game board and resets to its
   *  initial state
   * @param activeGameBoard
   */
  clearBoard(activeGameBoard) {
    // Clear active game board's specifics
    this.lotteryGames[activeGameBoard].selectedItems.length = 0;
    this.lotteryGames[activeGameBoard].system = 6;
    this.lotteryGames[activeGameBoard].boardCost = 0;
    //clear the error
    this.setError('');
    // Calculate the total cost
    this.calculateTotalCost(activeGameBoard);
  }

  /**
   * Clears all game boards and resets them its
   *  initial state
   */
  clearAllBoards() {
    // Clear every game boards' specifics
    Object.keys(this.lotteryGames).forEach((lotteryGameKey) => {
      this.clearBoard(lotteryGameKey);
    });
    //clear the error
    this.setError('');
  }

  /**
   * Quick Pick Random numbers for our current game board
   * @param lotteryGame
   */
  quickPick(lotteryGame) {
    // Make a temp Array of game board numbers and shuffle it
    const tempArray = Array(this.lotteryGames[lotteryGame].board.length).join(0).split(0).map((v, i) => i + 1);
    const shuffledArray = arrayShuffle(tempArray);
    this.lotteryGames[lotteryGame].selectedItems = shuffledArray.slice(0, this.lotteryGames[lotteryGame].system);
    // validate if the is any error and recalculate total cost and active game board cost
    this.validateAndCalculateCost(lotteryGame);
  }

  /**
   * Quick pick random numbers for every game board
   */
  quickPickAll() {
    //Same operation as quickPick but for every game Board
    Object.keys(this.lotteryGames).forEach((lotteryGameKey) => {
      this.quickPick(lotteryGameKey);
      // validate if the is any error and recalculate total cost and active game board cost for every game board
    });
  }

  /**
   * Calculates the game board cost for a specific game board
   * @param activeGameBoard
   */
  calculateBoardCost(activeGameBoard) {
    if(this.lotteryGames[activeGameBoard].selectedItems.length !== this.lotteryGames[activeGameBoard].system) {
      return;
    }

    if(this.lotteryGames[activeGameBoard].system === 6) {
      this.lotteryGames[activeGameBoard].boardCost = 1;
    } else {
      this.lotteryGames[activeGameBoard].boardCost = nCk(this.lotteryGames[activeGameBoard].system, 6);
    }
  }

  /**
   * Calculates the total cost of all the game boards
   */
  calculateTotalCost() {
    let sum = 0;
    Object.keys(this.lotteryGames).forEach((lotteryGameKey) => {
      this.calculateBoardCost(lotteryGameKey);
      sum += this.lotteryGames[lotteryGameKey].boardCost;
    });
    this.lottery.ticket.ticketCost = sum;
  }

  /**
   * Validates if the selected items of our specific game board is different
   * than the system and sets the error and recalculates the total board cost
   * and our current game board cost
   * @param activeGameBoard
   */
  validateAndCalculateCost(activeGameBoard) {
    if (this.activeGameBoardSelectedItems.length !== this.system && this.activeGameBoardSelectedItems.length !==0) {
      this.lotteryGames[activeGameBoard].boardCost = 0;
      this.calculateTotalCost();
      const error = this.activeGameBoardSelectedItems.length < this.system ?
        `You have ${Math.abs(this.activeGameBoardSelectedItems.length - this.system)} remaining numbers` :
        `You need to exclude ${Math.abs(this.activeGameBoardSelectedItems.length - this.system)} numbers`;
      this.setError(error);
    } else {
      this.setError('');
      this.calculateTotalCost();
    }
  }

  /**
   * Sets the error to our lottery system
   * @param error
   */
  setError(error) {
    this.lottery.error = error;
  }


  // Computed
  /**
   * Returns our active game board
   * @returns {string}
   */
  get activeGameBoard() {
    return this.lottery.activeGameBoard;
  }

  /**
   * Returns the lottery games with their configuration
   * @returns {{game1: {system: number, boardCost: number, id: string, label: string, board: *[], selectedItems: [], availableSystem: number[]}, game3: {system: number, boardCost: number, id: string, label: string, board, selectedItems: [], availableSystem: number[]}, game2: {system: number, boardCost: number, id: string, label: string, board, selectedItems: [], availableSystem: number[]}}}
   */
  get lotteryGames() {
    return this.lottery.ticket.games;
  }

  /**
   * Returns the current game board's selected numbers
   * @returns {number[]}
   */
  get activeGameBoardSelectedItems() {
    return this.lotteryGames[this.activeGameBoard].selectedItems;
  }

  /**
   * Returns the game board's numbers
   * @returns {number[]}
   */
  get selectedGameBoard() {
    return this.lotteryGames[this.activeGameBoard].board;
  }

  /**
   * Returns the available system that a user can play
   * @returns {number[]}
   */
  get availableSystem() {
    return this.lotteryGames[this.activeGameBoard].availableSystem;
  }

  /**
   * Returns the applied system to our current game board
   * @returns {number}
   */
  get system() {
    return this.lotteryGames[this.activeGameBoard].system;
  }

  /**
   * Returns the board cost of our current game board
   * @returns {number}
   */
  get boardCost() {
    return this.lotteryGames[this.activeGameBoard].boardCost;
  }

  /**
   * Returns the total cost of all the games of our lottery store
   * @returns {number}
   */
  get totalCost() {
    return this.lottery.ticket.ticketCost;
  }
}

decorate(LotteryStore, {
  lottery: observable,
  addNewDraw: action,
  setActiveGameBoard: action,
  selectBoardNumber: action,
  unselectBoardNumber: action,
  setError: action,
  changeSystem: action,
  clearBoard: action,
  clearAllBoards: action,
  quickPick: action,
  quickPickAll: action,
  calculateBoardCost: action,
  calculateTotalCost: action,
  activeGameBoard: computed,
  lotteryGames: computed,
  activeGameBoardSelectedItems: computed,
  selectedGameBoard: computed,
  availableSystem: computed,
  system: computed,
  boardCost: computed,
  totalCost: computed
});

export const TodoStoreContext = createContext(new LotteryStore());
