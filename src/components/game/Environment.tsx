
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Target from './Target';

export default function Environment() {
  const floorRef = useRef();
  
  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />
      
      {/* Directional Light (sunlight) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
      />
      
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1, 0]} 
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#6F7378" />
      </mesh>
      
      {/* Walls */}
      <mesh position={[-20, 5, 0]} castShadow>
        <boxGeometry args={[1, 10, 40]} />
        <meshStandardMaterial color="#8D8E8F" />
      </mesh>
      
      <mesh position={[20, 5, 0]} castShadow>
        <boxGeometry args={[1, 10, 40]} />
        <meshStandardMaterial color="#8D8E8F" />
      </mesh>
      
      <mesh position={[0, 5, -20]} castShadow>
        <boxGeometry args={[40, 10, 1]} />
        <meshStandardMaterial color="#8D8E8F" />
      </mesh>
      
      <mesh position={[0, 5, 20]} castShadow>
        <boxGeometry args={[40, 10, 1]} />
        <meshStandardMaterial color="#8D8E8F" />
      </mesh>
      
      {/* Obstacles */}
      <mesh position={[-5, 1, -5]} castShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#7D7F81" />
      </mesh>
      
      <mesh position={[5, 1, 5]} castShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color="#7D7F81" />
      </mesh>
      
      {/* Targets */}
      <Target position={[8, 1, -8]} />
      <Target position={[-8, 1, 8]} />
      <Target position={[0, 1, -15]} />
      <Target position={[-12, 1, -12]} />
      <Target position={[12, 1, 12]} />
    </>
  );
}
