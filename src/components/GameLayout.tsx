
import GameScene from './game/GameScene';
import GameUI from './game/GameUI';
import MainMenu from './game/MainMenu';
import { useGameStore } from '@/store/gameStore';

export default function GameLayout() {
  const isGameActive = useGameStore(state => state.isGameActive);
  
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {isGameActive ? (
        <>
          <GameScene />
          <GameUI />
        </>
      ) : (
        <MainMenu />
      )}
    </div>
  );
}
