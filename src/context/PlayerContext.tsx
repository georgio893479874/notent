import { ISong } from '@/interfaces/SongInterface';
import { createContext, useContext, useState } from 'react';

interface PlayerContextProps {
  selectedSong?: ISong;
  setSelectedSong: React.Dispatch<React.SetStateAction<ISong | undefined>>;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState<ISong | undefined>(undefined);

  return (
    <PlayerContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }

  return context;
};
