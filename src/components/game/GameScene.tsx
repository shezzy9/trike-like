
import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import Player from './Player';
import Environment from './Environment';
import Weapon from './Weapon';
import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { ErrorBoundary } from 'react-error-boundary';

// Simple fallback for Three.js errors
function ErrorFallback({ error }) {
  console.error("Three.js error:", error);
  return (
    <div className="text-white text-center p-6 bg-black/80 rounded-lg">
      <h2 className="text-xl font-bold mb-2">3D Rendering Error</h2>
      <p>Could not initialize the game scene.</p>
    </div>
  );
}

export default function GameScene() {
  const controlsRef = useRef(null);
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
  
  useEffect(() => {
    if (isGameActive && !isPaused && controlsRef.current) {
      // @ts-ignore - The type definitions aren't complete
      controlsRef.current.lock();
    }
  }, [isGameActive, isPaused]);
  
  return (
    <div className="w-full h-full">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas 
          shadows 
          camera={{ position: [0, 1.5, 5], fov: 60 }}
          gl={{ alpha: false }}
        >
          <Player />
          <Environment />
          <Weapon />
          <PointerLockControls ref={controlsRef} />
        </Canvas>
      </ErrorBoundary>
      
      <div className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ${!isGameActive || isPaused ? 'bg-black/50' : 'pointer-events-none'}`}>
        {!isGameActive && !isPaused && (
          <div className="text-white text-center p-6 bg-black/80 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">CS Web Edition</h2>
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
