// components/Board.tsx

import React from 'react';
import Cell from './Cell';
import "../styles.css"
interface BoardProps {
    board: number[][],
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, row: number, column: number) => void,
    conflicts: Array<{row: number, column: number}>,
    conflictRow: number | null
  }
  
const Board: React.FC<BoardProps> = ({ board, handleInputChange, conflicts, conflictRow }) => {
  return  (
    <div>
      {board.map((row, rowIdx) => (
        <div 
          key={rowIdx} 
          style={rowIdx === conflictRow ? {backgroundColor: 'red'} : {}}
        >
          {row.map((value, columnIdx) => (
            <Cell 
              key={columnIdx} 
              value={value}
              isConflict={conflicts.some(conflict => conflict.row === rowIdx && conflict.column === columnIdx)} 
              onChange={(e) => handleInputChange(e, rowIdx, columnIdx)} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;