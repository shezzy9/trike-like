
import { useGameStore } from '@/store/gameStore';

export default function MainMenu() {
  const startGame = useGameStore(state => state.startGame);
  const isGameActive = useGameStore(state => state.isGameActive);
  
  if (isGameActive) return null;
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-white mb-2">CS Web</h1>
      <p className="text-xl text-gray-300 mb-8">First Person Shooter</p>
      
      <button 
        onClick={() => startGame()}
        className="px-8 py-3 bg-game-primary text-white rounded font-bold text-xl hover:bg-green-600 transition-colors mb-4"
      >
        START GAME
      </button>
      
      <div className="mt-12 text-gray-400 max-w-md text-center">
        <h2 className="text-xl font-bold text-white mb-2">Controls</h2>
        <p className="mb-4">WASD to move, Mouse to aim, Click to shoot, R to reload, ESC to pause</p>
        <p>Shoot the red targets to score points!</p>
      </div>
    </div>
  );
}
