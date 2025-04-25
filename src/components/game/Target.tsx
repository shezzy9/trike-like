
import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';

interface TargetProps {
  position: [number, number, number];
}

export default function Target({ position }: TargetProps) {
  const meshRef = useRef<Mesh>(null);
  const [isHit, setIsHit] = useState(false);
  const incrementScore = useGameStore(state => state.incrementScore);
  
  useFrame(() => {
    if (meshRef.current && isHit) {
      meshRef.current.scale.y = Math.max(0, meshRef.current.scale.y - 0.05);
      if (meshRef.current.scale.y <= 0.05) {
        setIsHit(false);
        if (meshRef.current) {
          meshRef.current.scale.y = 1;
          // Move target to new position
          const newPos = new Vector3(
            position[0] + (Math.random() - 0.5) * 10,
            position[1],
            position[2] + (Math.random() - 0.5) * 10
          );
          meshRef.current.position.copy(newPos);
        }
      }
    }
  });
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isHit) {
      setIsHit(true);
      incrementScore(100);
    }
  };
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      castShadow
    >
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={isHit ? "#FF0000" : "#FF6347"} />
    </mesh>
  );
}
