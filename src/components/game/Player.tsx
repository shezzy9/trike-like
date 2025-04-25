
import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';

const MOVE_SPEED = 5;

export default function Player() {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight - 80 });
  const moveDirection = { x: 0, y: 0 };
  
  const isGameActive = useGameStore(state => state.isGameActive);
  const isPaused = useGameStore(state => state.isPaused);
  
  useEffect(() => {
    if (!isGameActive || isPaused) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': moveDirection.y = -1; break;
        case 'KeyS': case 'ArrowDown': moveDirection.y = 1; break;
        case 'KeyD': case 'ArrowRight': moveDirection.x = 1; break;
        case 'KeyA': case 'ArrowLeft': moveDirection.x = -1; break;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': case 'KeyS': case 'ArrowDown':
          moveDirection.y = 0;
          break;
        case 'KeyD': case 'ArrowRight': case 'KeyA': case 'ArrowLeft':
          moveDirection.x = 0;
          break;
      }
    };
    
    const gameLoop = setInterval(() => {
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - 60, prev.x + moveDirection.x * MOVE_SPEED)),
        y: Math.max(0, Math.min(window.innerHeight - 60, prev.y + moveDirection.y * MOVE_SPEED))
      }));
    }, 16); // ~60fps
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(gameLoop);
    };
  }, [isGameActive, isPaused]);
  
  if (!isGameActive || isPaused) return null;
  
  return (
    <div 
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transition: 'all 0.05s ease-out',
      }}
    >
      {/* Human-like character shape */}
      <div className="relative w-12 h-16">
        {/* Head */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#0EA5E9] rounded-full" />
        {/* Body */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#0EA5E9] rounded-md" />
        {/* Arms */}
        <div className="absolute top-6 left-0 w-3 h-6 bg-[#0EA5E9] rounded-full" />
        <div className="absolute top-6 right-0 w-3 h-6 bg-[#0EA5E9] rounded-full" />
      </div>
    </div>
  );
}
