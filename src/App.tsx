// App.tsx

import React, { useState } from 'react';
import Sudoku from './models/Sudoku';
import Board from './components/Board';

const App: React.FC = () => {
  const [game, setGame] = useState(new Sudoku());

  const [conflicts, setConflicts] = useState<Array<{row: number, column: number}>>([]);
  const [conflictRow, setConflictRow] = useState<number | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, column: number) => {
    const newBoard = [...game.board];
    const number = parseInt(e.target.value, 10);

    if(game.isValidAndFindConflicts(newBoard, row, column, number)) {
      newBoard[row][column] = number;
      setConflicts([]);
      setConflictRow(null);
    } else {
      setConflicts([...game.conflicts]);
      setConflictRow(row);
    }

    setGame(new Sudoku(newBoard));
  }
  const handleAutoFill = () => {
    const newGame = new Sudoku([...game.board]); // we need to copy the array for react state to update
    newGame.randomFill();
    setGame(newGame);
  }
  
  return (
    <>
    <div>
      <h1>Sudoku cyber club</h1>
    </div>
    <Board board={game.board} 
    handleInputChange={handleInputChange} 
    conflicts={conflicts}
    conflictRow={conflictRow}
    />
    <button onClick={handleAutoFill}>Auto Fill Random Input</button>
  </>
  );
}

export default App;