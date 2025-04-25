
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
      
      setTimeout(() => {
        setIsHit(false);
        setPos({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100)
        });
      }, 500);
    }
  };
  
  return (
    <div 
      className="absolute cursor-pointer transition-all duration-200"
      style={{ 
        left: pos.x, 
        top: pos.y,
        width: `${size}px`,
        height: `${size * 1.2}px`,
        transform: isHit ? 'scale(0.8)' : 'scale(1)'
      }}
      onClick={handleClick}
    >
      {/* Zombie character */}
      <div className="relative w-full h-full">
        {/* Head */}
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/2 ${isHit ? 'bg-red-900' : 'bg-green-800'} rounded-full`} />
        {/* Body */}
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 ${isHit ? 'bg-red-900' : 'bg-green-800'} rounded-md`} />
        {/* Arms (crooked for zombie effect) */}
        <div className={`absolute top-1/3 left-0 w-1/4 h-1/3 ${isHit ? 'bg-red-900' : 'bg-green-800'} rounded-full transform rotate-45`} />
        <div className={`absolute top-1/3 right-0 w-1/4 h-1/3 ${isHit ? 'bg-red-900' : 'bg-green-800'} rounded-full transform -rotate-45`} />
      </div>
    </div>
  );
}
