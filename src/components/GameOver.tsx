import React from 'react';
import { RefreshCw, Trophy } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, highScore, onRestart }) => {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="absolute inset-0 bg-black/90 z-30 flex flex-col items-center justify-center rounded-md backdrop-blur-sm">
      <h2 className="text-red-500 text-3xl font-bold mb-4">¡Juego Terminado!</h2>
      <div className="flex flex-col items-center gap-2 mb-6">
        <p className="text-white text-xl">Puntuación Final: {score}</p>
        <div className="flex items-center gap-2 text-yellow-400">
          <Trophy size={20} />
          <span>Mejor Puntuación: {highScore}</span>
        </div>
        {isNewHighScore && (
          <p className="text-green-400 text-lg mt-2">¡Nueva Mejor Puntuación!</p>
        )}
      </div>
      <button
        onClick={onRestart}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full transition-colors flex items-center"
      >
        <RefreshCw size={18} className="mr-2" />
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default GameOver