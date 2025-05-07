import { useState, useEffect, useRef } from 'react';
import { Position, Direction } from '../types/gameTypes';
import { isSamePosition, checkCollision, getRandomFoodPosition } from '../utils/gameUtils';

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const BOARD_SIZE = 20;
const INITIAL_SPEED = 150;
const MIN_SPEED = 80;
const SPEED_DECREMENT = 2;

const useSnakeGame = (username: string) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('right');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(`snake-high-score-${username}`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const lastDirection = useRef(direction);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = () => {
    const newFood = getRandomFoodPosition(BOARD_SIZE, snake);
    setFood(newFood);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    generateFood();
    setDirection('right');
    lastDirection.current = 'right';
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };

  const togglePause = () => {
    if (isGameOver) return;
    setIsPaused(prev => !prev);
  };

  const handleDirectionChange = (newDirection: Direction) => {
    lastDirection.current = newDirection;
    setDirection(newDirection);
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(`snake-high-score-${username}`, score.toString());
    }
  }, [score, highScore, username]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        
        switch (lastDirection.current) {
          case 'up':
            head.y -= 1;
            break;
          case 'down':
            head.y += 1;
            break;
          case 'left':
            head.x -= 1;
            break;
          case 'right':
            head.x += 1;
            break;
        }

        if (
          head.x < 0 || 
          head.x >= BOARD_SIZE || 
          head.y < 0 || 
          head.y >= BOARD_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        if (checkCollision(head, prevSnake.slice(1))) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];
        
        if (isSamePosition(head, food)) {
          setScore(prev => prev + 1);
          setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_DECREMENT));
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = window.setTimeout(moveSnake, speed);

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [snake, food, isGameOver, isPaused, speed]);

  return {
    snake,
    food,
    direction,
    isGameOver,
    isPaused,
    score,
    highScore,
    setDirection: handleDirectionChange,
    resetGame,
    togglePause,
  };
};

export default useSnakeGame;