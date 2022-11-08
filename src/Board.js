import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5}) {


  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    // TODO: create array-of-arrays of true/false values
    for(let i = 0; i < nrows; i++){
      
      let row = [];
      for (let j = 0; j < ncols; j++){
        row.push(Math.random() > chanceLightStartsOn ? true : false);      
      };

      initialBoard.push(row);
      // console.log(initialBoard);  
    };

    return initialBoard;

  };



  // function hasWon() {
  //   // TODO: check the board in state to determine whether the player has won.
  // }

  function hasWon(){
    console.log("!")
    console.log(board);

    // checks whether all elements in row, then then column/ cell.
    let lightsOut = board.every(row => row.every(cell => cell === false));
    // console.log(lightsOut)

    return lightsOut;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
    
      const [rowInd, colInd] = coord.split("-").map(Number);

      const flipCell = (rowInd, colInd, boardCopy) => {
        
        // if this coord is actually on board, flip it
        if (colInd >= 0 && colInd < ncols && rowInd >= 0 && rowInd < nrows) {
          boardCopy[rowInd][colInd] = !boardCopy[rowInd][colInd];
          // moves from true to false, false to true (off to on, on to off)
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const boardCopy = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      let targetCell = flipCell(rowInd, colInd, boardCopy); 
      let topFlip = flipCell(rowInd-1, colInd, boardCopy);
      let rightFlip = flipCell(rowInd, colInd+1, boardCopy);
      let bottomFlip = flipCell(rowInd+1, colInd, boardCopy);
      let leftFlip = flipCell(rowInd, colInd-1, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }


  // TODO
  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    console.log("Winner")
    return (
    <div>
      <p>Congratulations, you won!</p>
    </div>)
  }

  // TODO
  // make table board

  let tableBoard = [];
  for(let rowInd = 0; rowInd < nrows; rowInd++){
      
    let row = [];
    for (let colInd = 0; colInd < ncols; colInd++){

      // use indexes to set coordinates.
      let coords = `${rowInd}-${colInd}`;
      
      let cellLitStatus = board[rowInd][colInd]
      
      row.push(
        <Cell 
          flipCellsAroundMe = {() => flipCellsAround(coords)} 
          isLit = {cellLitStatus}
          key = {coords}
          className = "Board-cell"
        />
      )     
    };
    tableBoard.push(<tr>{row}</tr>);
  };


  // TODO

  return (
    <div className = "Board">
      <p className = "Board-instructions">
        The goal of lights-out is to turn off all the lights! To win, you must have a full board of the almond colored cells. To play, you can click on any individual cell. Each cell will flip the light for the clicked cell, the top, bottom, left, and right cell next to the cell clicked on. The corner cells will only flip the cell they neighbor. Good luck!
      </p>
        <table className = "Board-game"> 
          <tbody>{tableBoard}</tbody> 
        </table>
    </div>
  )

// 
};

export default Board;
