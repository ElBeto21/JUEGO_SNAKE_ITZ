import React, { useState } from 'react';

interface UserNameModalProps {
  onSubmit: (username: string) => void;
}

const UserNameModal: React.FC<UserNameModalProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-green-500">
      <h2 className="text-2xl font-bold text-green-400 mb-4">¡Bienvenido al Juego de la Serpiente!</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa tu nombre de usuario"
          className="bg-gray-800 text-white px-4 py-2 rounded-md border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Comenzar Juego
        </button>
      </form>
    </div>
  );
};

export default UserNameModal