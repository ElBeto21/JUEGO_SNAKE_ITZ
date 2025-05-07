import { Position } from '../types/gameTypes';

// Check if two positions are the same
export const isSamePosition = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

// Check if position collides with any segment in segments array
export const checkCollision = (position: Position, segments: Position[]): boolean => {
  return segments.some(segment => isSamePosition(position, segment));
};

// Generate a random position for food that isn't on the snake
export const getRandomFoodPosition = (boardSize: number, snake: Position[]): Position => {
  let newFood: Position;
  
  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (checkCollision(newFood, snake));
  
  return newFood;
};