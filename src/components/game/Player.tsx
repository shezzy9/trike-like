
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useGameStore } from '@/store/gameStore';

const MOVE_SPEED = 0.1;
const TARGET_DISTANCE = 0.5;

export default function Player() {
  const { camera } = useThree();
  const moveDirection = useRef({ forward: 0, right: 0 });
  const isGameActive = useGameStore(state => state.isGameActive);
  const isPaused = useGameStore(state => state.isPaused);
  
  useEffect(() => {
    if (!isGameActive || isPaused) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': moveDirection.current.forward = 1; break;
        case 'KeyS': moveDirection.current.forward = -1; break;
        case 'KeyD': moveDirection.current.right = 1; break;
        case 'KeyA': moveDirection.current.right = -1; break;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'KeyS':
          moveDirection.current.forward = 0;
          break;
        case 'KeyD':
        case 'KeyA':
          moveDirection.current.right = 0;
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isGameActive, isPaused]);

  useFrame(() => {
    if (!isGameActive || isPaused) return;
    
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      -moveDirection.current.forward
    );
    const sideVector = new Vector3(
      moveDirection.current.right,
      0,
      0
    );
    
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED);
    
    camera.position.add(direction);
  });

  return null;
}
