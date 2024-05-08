import Tile from "./Tile";
import { useState } from "react";

interface GridProps {
  width: number;
  height: number;
  bombs: number;
}

interface GridTemplate {
  i: number;
  j: number;
  isBomb: boolean;
  neighborValue: number;
  revealed: boolean;
  isFlag: boolean;
}

export default function Grid({ width, height, bombs }: GridProps) {
  const [firstClick, setFirstClick] = useState(false);
  const [gridTiles, setGridTile] = useState(
    Array.from(Array(height), (_, i) =>
      Array.from(Array(width), (_, j) => ({
        i,
        j,
        isBomb: false,
        neighborValue: 0,
        revealed: false,
        isFlag: false,
      }))
    )
  );

  function placeBombs(startingRow: number, startingCol: number) {
    //Place bombs after the first click

    const newGrid = [...gridTiles];

    for (let i = 0; i < bombs; i++) {
      let randomRow = 0;
      let randomCol = 0;

      let rowDiff = 0;
      let colDiff = 0;
      //Put bombs down
      do {
        randomRow = Math.floor(Math.random() * height);
        randomCol = Math.floor(Math.random() * width);
        rowDiff = startingRow - randomRow;
        colDiff = startingCol - randomCol;
        // console.log(
        //   randomRow,
        //   randomCol,
        //   startingRow,
        //   startingCol,
        //   rowDiff,
        //   colDiff
        // );
      } while (
        //Bombs shouldn't be placed on top of each other or around the starting click
        newGrid[randomRow][randomCol].isBomb ||
        (rowDiff <= 1 && rowDiff >= -1 && colDiff <= 1 && colDiff >= -1)
      );

      const directions = [
        [randomRow - 1, randomCol - 1], //DiagUpperLeft
        [randomRow - 1, randomCol], //Up
        [randomRow - 1, randomCol + 1], //DiagUpperRight
        [randomRow, randomCol + 1], //Right
        [randomRow + 1, randomCol + 1], //DiagLowerRight
        [randomRow + 1, randomCol], //Down
        [randomRow + 1, randomCol - 1], //DiagLowerLeft
        [randomRow, randomCol - 1], //Left
      ];

      //Calculate neighbor values
      directions.forEach((dir) => {
        if (dir[0] < 0 || dir[1] < 0 || dir[0] >= height || dir[1] >= width) {
          return;
        } else {
          newGrid[dir[0]][dir[1]].neighborValue++;
        }
      });
      newGrid[randomRow][randomCol].isBomb = true;
    }

    setGridTile(newGrid);
  }

  function revealEmptyTiles(startingRow: number, startingCol: number) {
    function reveal(grid: GridTemplate[][], i: number, j: number) {
      const directions = [
        [i - 1, j - 1], //DiagUpperLeft
        [i - 1, j], //Up
        [i - 1, j + 1], //DiagUpperRight
        [i, j + 1], //Right
        [i + 1, j + 1], //DiagLowerRight
        [i + 1, j], //Down
        [i + 1, j - 1], //DiagLowerLeft
        [i, j - 1], //Left
      ];

      //Show the Tile
      if (!grid[i][j].isFlag) grid[i][j].revealed = true;

      //If the tile has no bombs next to it, we show nearby tiles
      if (grid[i][j].neighborValue == 0) {
        directions.forEach((dir) => {
          if (dir[0] < 0 || dir[1] < 0 || dir[0] >= height || dir[1] >= width) {
            return;
          }
          const curTile = grid[dir[0]][dir[1]];
          if (!curTile.isBomb && !curTile.revealed) {
            reveal(grid, dir[0], dir[1]);
          }
        });
      }
    }
    const newGrid = [...gridTiles];
    //Recursively call
    reveal(newGrid, startingRow, startingCol);

    setGridTile(newGrid);
  }

  function plantFlag(
    e: React.MouseEvent<HTMLDivElement>,
    i: number,
    j: number
  ) {
    e.preventDefault();
    const newGrid = [...gridTiles];

    newGrid[i][j].isFlag = !newGrid[i][j].isFlag;

    setGridTile(newGrid);
  }

  function tileClick(
    e: React.MouseEvent<HTMLDivElement>,
    i: number,
    j: number
  ) {
    e.preventDefault();
    if (!firstClick) {
      placeBombs(i, j);
      setFirstClick(true);
    }
    const clickedTile = gridTiles[i][j];
    if (clickedTile.isBomb) {
      alert("Game Over!");
      revealBoard();
      return;
    }

    //Reveal Empty tiles
    revealEmptyTiles(i, j);
  }

  function revealBoard() {
    const newGrid = [...gridTiles];
    newGrid.forEach((gridRow) =>
      gridRow.forEach((tile) => {
        tile.revealed = true;
      })
    );
    setGridTile(newGrid);
  }

  return (
    <div
      className="grid w-96 h-96 mx-auto"
      style={{
        gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`,
      }}
    >
      {gridTiles.map((gridRows) =>
        gridRows.map((rowItem) => (
          <Tile
            key={`${rowItem.i}-${rowItem.j}`}
            isBomb={rowItem.isBomb}
            revealed={rowItem.revealed}
            neighborValue={rowItem.neighborValue}
            isFlag={rowItem.isFlag}
            onClick={(e) => tileClick(e, rowItem.i, rowItem.j)}
            onContextMenu={(e) => plantFlag(e, rowItem.i, rowItem.j)}
          />
        ))
      )}
    </div>
  );
}
