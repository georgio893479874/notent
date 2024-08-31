import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ISong } from '@/services/ControlsService';

interface PlayerContextProps {
  selectedSong?: ISong;
  setSelectedSong: React.Dispatch<React.SetStateAction<ISong | undefined>>;
  isPlaying?: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSong, setSelectedSong] = useState<ISong | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <PlayerContext.Provider value={{ selectedSong, setSelectedSong, isPlaying, setIsPlaying }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextProps => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
