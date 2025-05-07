import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RefreshCw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import GameBoard from './GameBoard';
import GameOver from './GameOver';
import Ranking from './Ranking';
import useSnakeGame from '../hooks/useSnakeGame';

interface SnakeGameProps {
  username: string;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ username }) => {
  const [showRanking, setShowRanking] = useState(false);
  const {
    snake,
    food,
    direction,
    isGameOver,
    isPaused,
    score,
    highScore,
    setDirection,
    resetGame,
    togglePause,
  } = useSnakeGame(username);

  const handleDirectionButton = useCallback((newDirection: string) => {
    switch (newDirection) {
      case 'up':
        if (direction !== 'down') setDirection('up');
        break;
      case 'down':
        if (direction !== 'up') setDirection('down');
        break;
      case 'left':
        if (direction !== 'right') setDirection('left');
        break;
      case 'right':
        if (direction !== 'left') setDirection('right');
        break;
    }
  }, [direction, setDirection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up');
          break;
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down');
          break;
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left');
          break;
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right');
          break;
        case ' ':
          togglePause();
          break;
        case 'r':
        case 'R':
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, setDirection, togglePause, resetGame]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center justify-between w-full max-w-2xl bg-gray-900 p-6 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold text-green-400">Puntuación: {score}</div>
          <div className="flex items-center gap-2 text-yellow-400 text-lg">
            <Trophy size={24} />
            <span>Mejor Puntuación: {highScore}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowRanking(true)}
            className="bg-yellow-600 text-white p-3 rounded-full hover:bg-yellow-700 transition-colors"
            aria-label="Ver ranking"
          >
            <Trophy size={24} />
          </button>
          <button 
            onClick={togglePause} 
            className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
            aria-label={isPaused ? "Reanudar juego" : "Pausar juego"}
          >
            {isPaused ? <Play size={24} /> : <Pause size={24} />}
          </button>
          <button 
            onClick={resetGame} 
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Reiniciar juego"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>

      <div className="relative">
        {isGameOver && <GameOver score={score} highScore={highScore} onRestart={resetGame} />}
        <GameBoard snake={snake} food={food} />
      </div>

      <div className="md:hidden mt-8 grid grid-cols-3 gap-3 w-60">
        <div className="col-start-2">
          <button 
            onClick={() => handleDirectionButton('up')} 
            className="w-full bg-gray-800 text-white p-4 rounded-md flex justify-center hover:bg-gray-700"
            aria-label="Mover arriba"
          >
            <ChevronUp size={28} />
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button 
            onClick={() => handleDirectionButton('left')} 
            className="w-full bg-gray-800 text-white p-4 rounded-md flex justify-center hover:bg-gray-700"
            aria-label="Mover izquierda"
          >
            <ChevronLeft size={28} />
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <button 
            onClick={() => handleDirectionButton('down')} 
            className="w-full bg-gray-800 text-white p-4 rounded-md flex justify-center hover:bg-gray-700"
            aria-label="Mover abajo"
          >
            <ChevronDown size={28} />
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button 
            onClick={() => handleDirectionButton('right')} 
            className="w-full bg-gray-800 text-white p-4 rounded-md flex justify-center hover:bg-gray-700"
            aria-label="Mover derecha"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      <div className="mt-8 text-gray-400 text-center max-w-md text-lg">
        <p className="mb-2">Usa las flechas del teclado para mover la serpiente.</p>
        <p className="mb-2">Presiona espacio para pausar/reanudar el juego.</p>
        <p>Presiona R para reiniciar.</p>
      </div>

      {showRanking && <Ranking onClose={() => setShowRanking(false)} />}
    </div>
  );
};

export default SnakeGame;