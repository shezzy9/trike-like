
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
      className="absolute bg-blue-600 rounded-md"
      style={{
        left: position.x,
        top: position.y,
        width: '50px',
        height: '50px',
        transition: 'all 0.05s ease-out',
      }}
    />
  );
}
