// components/Cell.tsx

import React from 'react';
import "../styles.css"
interface CellProps {
    value: number,
    isConflict: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  }

const Cell: React.FC<CellProps> = ({ value, isConflict, onChange }) => {
  return (
    <input 
      type="number" 
      min="1" 
      max="9" 
      value={value ? value : ''}
      style={isConflict ? {backgroundColor: "blue"} : {}}
      onChange={onChange} 
    />
  );
}

export default Cell;