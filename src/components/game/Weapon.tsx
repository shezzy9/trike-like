
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import { DoubleSide, Mesh } from 'three';

export default function Weapon() {
  const meshRef = useRef<Mesh>(null);
  const { camera } = useThree();
  const [isFiring, setIsFiring] = useState(false);
  
  const fireWeapon = useGameStore(state => state.fireWeapon);
  const reloadWeapon = useGameStore(state => state.reloadWeapon);
  const ammo = useGameStore(state => state.ammo);
  const isGameActive = useGameStore(state => state.isGameActive);
  const isPaused = useGameStore(state => state.isPaused);
  
  useEffect(() => {
    if (!isGameActive || isPaused) return;
    
    const handleMouseDown = () => {
      if (ammo > 0) {
        setIsFiring(true);
        fireWeapon();
        setTimeout(() => setIsFiring(false), 100);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyR') {
        reloadWeapon();
      }
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ammo, fireWeapon, reloadWeapon, isGameActive, isPaused]);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(
        camera.position.x + 0.25,
        camera.position.y - 0.25,
        camera.position.z - 0.5
      );
      meshRef.current.rotation.copy(camera.rotation);
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={[0, -0.25, -0.5]}
      scale={isFiring ? [0.1, 0.1, 0.2] : [0.1, 0.1, 0.3]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#444444" />
      
      {/* Gun barrel */}
      <mesh position={[0, 0.1, -0.6]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </mesh>
  );
}
