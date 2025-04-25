
import React from 'react';
import { useGameStore } from '@/store/gameStore';

export default function GameUI() {
  const health = useGameStore(state => state.health);
  const ammo = useGameStore(state => state.ammo);
  const score = useGameStore(state => state.score);
  const isGameActive = useGameStore(state => state.isGameActive);
  const isPaused = useGameStore(state => state.isPaused);
  
  if (!isGameActive || isPaused) return null;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
      <div className="container mx-auto flex items-center justify-between">
        {/* Health Bar */}
        <div className="w-64">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-sm font-bold">Health</span>
            <span className="text-white text-sm">{health}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-game-health-bar h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${health}%` }}
            ></div>
          </div>
        </div>
        
        {/* Score */}
        <div className="text-white text-2xl font-bold">
          {score.toString().padStart(5, '0')}
        </div>
        
        {/* Ammo Counter */}
        <div className="text-right">
          <div className="text-white text-sm mb-1">Ammo</div>
          <div className="text-white text-2xl font-mono font-bold">
            {ammo} <span className="text-gray-400">/ 30</span>
          </div>
          {ammo === 0 && (
            <div className="text-game-secondary text-sm animate-pulse">Press R to reload</div>
          )}
        </div>
      </div>
      
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-4 h-4 relative">
          <div className="absolute w-4 h-0.5 bg-white top-1/2 left-0 transform -translate-y-1/2"></div>
          <div className="absolute w-0.5 h-4 bg-white top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}
