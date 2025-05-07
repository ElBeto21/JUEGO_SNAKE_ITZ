import React from 'react';
import { Trophy } from 'lucide-react';

interface RankingProps {
  onClose: () => void;
}

const Ranking: React.FC<RankingProps> = ({ onClose }) => {
  const getHighScores = () => {
    const scores: { username: string; score: number }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('snake-high-score-')) {
        const username = key.replace('snake-high-score-', '');
        const score = parseInt(localStorage.getItem(key) || '0', 10);
        scores.push({ username, score });
      }
    }
    return scores.sort((a, b) => b.score - a.score);
  };

  const highScores = getHighScores();

  return (
    <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-green-500 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
            <Trophy size={24} />
            Tabla de Clasificación
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {highScores.length > 0 ? (
          <div className="space-y-4">
            {highScores.map((score, index) => (
              <div
                key={score.username}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  index === 0 ? 'bg-yellow-500/20 border border-yellow-500/50' :
                  index === 1 ? 'bg-gray-400/20 border border-gray-400/50' :
                  index === 2 ? 'bg-orange-700/20 border border-orange-700/50' :
                  'bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-green-400 w-8">
                    #{index + 1}
                  </span>
                  <span className="text-white">{score.username}</span>
                </div>
                <span className="text-green-400 font-bold">{score.score}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No hay puntuaciones todavía</p>
        )}
      </div>
    </div>
  );
};

export default Ranking;