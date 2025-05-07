import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import UserNameModal from './components/UserNameModal';
import { LogOut } from 'lucide-react';

function App() {
  const [username, setUsername] = useState<string>('');
  const [showModal, setShowModal] = useState(true);

  const handleUsernameSubmit = (name: string) => {
    setUsername(name);
    setShowModal(false);
  };

  const handleLogout = () => {
    setShowModal(true);
    setUsername('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {showModal ? (
        <UserNameModal onSubmit={handleUsernameSubmit} />
      ) : (
        <>
          <div className="w-full max-w-4xl flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-green-400 mb-2">Juego de la Serpiente</h1>
              <p className="text-green-500">¡Bienvenido, {username}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Cambiar Usuario
            </button>
          </div>
          <SnakeGame username={username} />
        </>
      )}
    </div>
  );
}

export default App;