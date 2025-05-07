import React, { useMemo } from 'react';
import { Position } from '../types/gameTypes';
import { isSamePosition } from '../utils/gameUtils';

interface GameBoardProps {
  snake: Position[];
  food: Position;
}

const CELL_SIZE = 20; // Increased from 15
const BOARD_SIZE = 20;

const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  // Create the grid cells
  const gridCells = useMemo(() => {
    const cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const currentPosition = { x, y };
        const isSnakeHead = isSamePosition(currentPosition, snake[0]);
        const isSnakeBody = snake.slice(1).some((segment, index) => isSamePosition(segment, currentPosition));
        const isFood = isSamePosition(currentPosition, food);
        const snakeSegmentIndex = snake.findIndex(segment => isSamePosition(segment, currentPosition));
        
        let cellClass = "absolute transition-all duration-100 flex items-center justify-center";
        let content = '';
        
        if (isSnakeHead) {
          cellClass += " bg-green-500 rounded-md z-20";
        } else if (isSnakeBody) {
          cellClass += " bg-green-400 rounded-sm z-10";
          // Add "ITZO" text cycling through the snake body
          const letters = "ITZO";
          if (snakeSegmentIndex > 0) {
            content = letters[(snakeSegmentIndex - 1) % 4];
          }
        } else if (isFood) {
          cellClass += " bg-red-500 rounded-full z-10";
        } else {
          continue; // Skip rendering empty cells for better performance
        }
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
              transform: isSnakeHead ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            <span className="text-xs font-bold text-white">{content}</span>
          </div>
        );
      }
    }
    return cells;
  }, [snake, food]);

  return (
    <div 
      className="relative bg-gray-800 border-2 border-gray-700 rounded-md overflow-hidden"
      style={{ 
        width: BOARD_SIZE * CELL_SIZE,
        height: BOARD_SIZE * CELL_SIZE,
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
      }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => (
          <div key={i} className="border border-gray-700" />
        ))}
      </div>
      
      {gridCells}
    </div>
  );
};

export default GameBoard;