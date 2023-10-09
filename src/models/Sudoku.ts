// models/Sudoku.ts

export default class Sudoku {
    board: number[][];
  
    constructor(board?: number[][]) {
      if (board) {
        this.board = board;
      } else {
        this.board = Array(9).fill(0).map(() => Array(9).fill(0)); // Create a 9x9 board filled with zeros
      }
    }
    conflicts: {row: number, column: number}[] = [];

    randomFill(): void {
        let numbersToAdd = Math.floor(Math.random() * 4) + 1;
      
        for (let n = 0; n < numbersToAdd; n++) {
            let row, col, number;
            
            do {
                row = Math.floor(Math.random() * 9);
                col = Math.floor(Math.random() * 9);
            } while (this.board[row][col] !== 0); // Повторять, пока ячейка не будет пустой (со значением 0)
            
            for (let i = 1; i <= 9; i++) {
                if (this.isValid(this.board, row, col, i)) {
                    number = i;
                    break;
                }
            }
          
            if (number) {
                this.board[row][col] = number;
            }
        }
    }
    isValidAndFindConflicts(board: number[][], row: number, column: number, num: number): boolean {
        this.conflicts = [];
        // checking in row
        for(let x = 0; x < 9; x++){
          if(board[row][x] === num) {
            this.conflicts.push({row: row, column: x})
          }
        }
        // checking in column
        for(let x = 0; x < 9; x++){
          if(board[x][column] === num){
            this.conflicts.push({row: x, column: column});
          }
        }
        // checking within the square
        const startRow = row - row % 3;
        const startCol = column - column % 3;
        for(let i = 0; i < 3; i++){
          for(let j = 0; j < 3; j++){
            if(board[i+startRow][j+startCol] === num){
              this.conflicts.push({row: i + startRow, column: j + startCol});
            }
          }
        }
        // if there's no conflict, return true
        if (this.conflicts.length === 0) {
          return true;
        }
        return false;
      }
    isValid(board: number[][], row: number, col: number, number: number): boolean {
      // Checking the row
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === number) {
          return false;
        }
      }
  
      // Checking the column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === number) {
          return false;
        }
      }
  
      // Checking the 3x3 square
      const startRow = row - row % 3;
      const startCol = col - col % 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i + startRow][j + startCol] === number) {
            return false;
          }
        }
      }
  
      return true;
    }
  }