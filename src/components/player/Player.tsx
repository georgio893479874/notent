import { useEffect, useState } from "react";
import useControlsService, { ISong } from "@/services/ControlsService";
import { supabase } from "@/services/SupabaseClientService";
import Controls from "./Controls";
import SongInfoModal from "../song/SongInfoModal";

const Player = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data, error } = await supabase.from("Songs").select("*");

    if (error) {
      throw error;
      return;
    }

    setSongs(data || []);
  };

  const {
    isPlaying,
    currentTime,
    duration,
    progressBar,
    audioPlayer,
    togglePlayPause,
    handleProgressChange,
    skipBegin,
    skipEnd,
    currentFormatted,
    durationFormatted,
  } = useControlsService({ songs, currentSongIndex, setCurrentSongIndex });

  return (
      <div className="flex flex-col items-center justify-center p-4">
        <Controls
          type="range"
          song={songs[currentSongIndex]} 
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          progressBar={progressBar}
          audioPlayer={audioPlayer}
          isPlaying={isPlaying}
          skipBegin={skipBegin}
          skipEnd={skipEnd}
          togglePlayPause={togglePlayPause}
          current={currentFormatted}
          duration={durationFormatted}
        />
        {isModalOpen && (
          <SongInfoModal 
            song={songs[currentSongIndex]} 
            onClose={() => setIsModalOpen(false)} 
            onPlayPause={togglePlayPause}
            isPlaying={isPlaying}
            type="range"
            min={0}
            max={duration}
            skipBegin={skipBegin}
            skipEnd={skipEnd}
            value={currentTime}
            onChange={handleProgressChange}
            progressBar={progressBar}
            current={currentFormatted}
          />
        )}
      </div>
  );
};

export default Player;


