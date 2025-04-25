
import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

interface TargetProps {
  position: { x: number, y: number };
  size?: number;
  speed?: number;
  points?: number;
}

export default function Target({ 
  position, 
  size = 40, 
  speed = 1,
  points = 100 
}: TargetProps) {
  const [isHit, setIsHit] = useState(false);
  const [pos, setPos] = useState(position);
  const incrementScore = useGameStore(state => state.incrementScore);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isHit) {
      setIsHit(true);
      incrementScore(points);
      
      // Reset target after a short delay
      setTimeout(() => {
        setIsHit(false);
        // Move to new random position
        setPos({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100)
        });
      }, 500);
    }
  };
  
  return (
    <div 
      className={`absolute rounded-full cursor-pointer transition-all duration-200 
        ${isHit ? 'bg-red-700 scale-75 opacity-50' : 'bg-red-500 hover:bg-red-600'}`}
      style={{ 
        left: pos.x, 
        top: pos.y, 
        width: `${size}px`, 
        height: `${size}px`,
        transform: isHit ? 'scale(0.8)' : 'scale(1)'
      }}
      onClick={handleClick}
    />
  );
}
