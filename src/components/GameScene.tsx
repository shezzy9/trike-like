
import Player from './game/Player';
import Environment from './game/Environment';
import Weapon from './game/Weapon';
import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export default function GameScene() {
  const isGameActive = useGameStore(state => state.isGameActive);
  const isPaused = useGameStore(state => state.isPaused);
  const togglePause = useGameStore(state => state.togglePause);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && isGameActive) {
        togglePause();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isGameActive, togglePause]);
  
  return (
    <div className="w-full h-full overflow-hidden relative">
      <Environment />
      <Player />
      <Weapon />
      
      <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ${!isGameActive || isPaused ? 'bg-black/50' : 'pointer-events-none'}`}>
        {!isGameActive && !isPaused && (
          <div className="text-white text-center p-6 bg-black/80 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Target Blaster</h2>
            <p className="mb-4">Click to start the game</p>
          </div>
        )}
        
        {isPaused && (
          <div className="text-white text-center p-6 bg-black/80 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
            <button
              className="px-4 py-2 bg-game-primary text-white rounded hover:bg-green-600 transition-colors"
              onClick={() => togglePause()}
            >
              Resume Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
