
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
    <div className="absolute top-0 left-0 right-0 p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Health Bar */}
        <div className="w-64">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-sm font-bold shadow-text">Health</span>
            <span className="text-white text-sm shadow-text">{health}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-game-health-bar h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${health}%` }}
            ></div>
          </div>
        </div>
        
        {/* Score */}
        <div className="text-white text-2xl font-bold shadow-text">
          {score.toString().padStart(5, '0')}
        </div>
        
        {/* Ammo Counter */}
        <div className="text-right">
          <div className="text-white text-sm mb-1 shadow-text">Ammo</div>
          <div className="text-white text-2xl font-mono font-bold shadow-text">
            {ammo} <span className="text-gray-400">/ 30</span>
          </div>
          {ammo === 0 && (
            <div className="text-game-secondary text-sm animate-pulse shadow-text">Press R to reload</div>
          )}
        </div>
      </div>
    </div>
  );
}
