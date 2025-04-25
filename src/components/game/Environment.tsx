
import React from 'react';
import Target from './Target';

export default function Environment() {
  // Create a set of targets with random positions
  const targetPositions = Array.from({ length: 10 }, () => ({
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100)
  }));
  
  return (
    <div className="fixed inset-0 bg-gray-800 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Obstacles */}
      <div className="absolute left-1/4 top-1/4 w-40 h-20 bg-gray-600 rounded-md" />
      <div className="absolute right-1/4 bottom-1/4 w-20 h-40 bg-gray-600 rounded-md" />
      <div className="absolute left-1/3 bottom-1/3 w-32 h-32 bg-gray-600 rounded-md" />
      
      {/* Targets */}
      {targetPositions.map((pos, index) => (
        <Target 
          key={index} 
          position={pos} 
          size={index % 3 === 0 ? 50 : 30} 
          points={index % 3 === 0 ? 50 : 100}
        />
      ))}
    </div>
  );
}
