
import { create } from 'zustand';

export interface GameState {
  // Game status
  isGameActive: boolean;
  isPaused: boolean;
  score: number;
  
  // Player stats
  health: number;
  ammo: number;
  
  // Actions
  startGame: () => void;
  endGame: () => void;
  togglePause: () => void;
  resetGame: () => void;
  takeDamage: (amount: number) => void;
  fireWeapon: () => void;
  reloadWeapon: () => void;
  incrementScore: (points: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  isGameActive: false,
  isPaused: false,
  score: 0,
  health: 100,
  ammo: 30,
  
  // Actions
  startGame: () => set({ isGameActive: true, isPaused: false, health: 100, ammo: 30, score: 0 }),
  endGame: () => set({ isGameActive: false }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  resetGame: () => set({ health: 100, ammo: 30, score: 0 }),
  
  takeDamage: (amount) => set((state) => {
    const newHealth = Math.max(0, state.health - amount);
    if (newHealth <= 0) {
      return { health: 0, isGameActive: false };
    }
    return { health: newHealth };
  }),
  
  fireWeapon: () => set((state) => {
    if (state.ammo <= 0) return state;
    return { ammo: state.ammo - 1 };
  }),
  
  reloadWeapon: () => set({ ammo: 30 }),
  
  incrementScore: (points) => set((state) => ({ score: state.score + points })),
}));
