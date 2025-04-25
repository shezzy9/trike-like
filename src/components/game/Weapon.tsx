
import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export default function Weapon() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFiring, setIsFiring] = useState(false);
  
  const fireWeapon = useGameStore(state => state.fireWeapon);
  const reloadWeapon = useGameStore(state => state.reloadWeapon);
  const ammo = useGameStore(state => state.ammo);
  const isGameActive = useGameStore(state => state.isGameActive);
  const isPaused = useGameStore(state => state.isPaused);
  
  // Track mouse position
  useEffect(() => {
    if (!isGameActive || isPaused) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => {
      if (ammo > 0) {
        setIsFiring(true);
        fireWeapon();
        setTimeout(() => setIsFiring(false), 200);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyR') {
        reloadWeapon();
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ammo, fireWeapon, reloadWeapon, isGameActive, isPaused]);
  
  if (!isGameActive || isPaused) return null;
  
  return (
    <>
      {/* Crosshair cursor */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          transform: 'translate(-50%, -50%)' 
        }}
      >
        <div className="relative w-6 h-6">
          <div className="absolute w-6 h-0.5 bg-white top-1/2 left-0 transform -translate-y-1/2"></div>
          <div className="absolute w-0.5 h-6 bg-white top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className={`absolute w-2 h-2 rounded-full bg-red-500 ${isFiring ? 'opacity-100' : 'opacity-0'}`} 
               style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
      </div>
      
      {/* Bullet trail effect */}
      {isFiring && (
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute h-0.5 bg-yellow-400 opacity-50 origin-bottom-right"
            style={{
              left: window.innerWidth / 2,
              bottom: 20,
              width: `${Math.sqrt(
                Math.pow(position.x - window.innerWidth / 2, 2) + 
                Math.pow(position.y - (window.innerHeight - 20), 2)
              )}px`,
              transform: `rotate(${Math.atan2(
                position.y - (window.innerHeight - 20), 
                position.x - window.innerWidth / 2
              ) * 180 / Math.PI}deg)`,
              transition: 'all 0.05s ease-out'
            }}
          />
        </div>
      )}
    </>
  );
}
