import { useEffect, useState } from "react";
import useControlsService, { ISong } from "@/services/ControlsService";
import { supabase } from "@/services/SupabaseClientService";
import Controls from "./Controls";
import Song from "../song/Song";
import { CircularProgress } from "@mui/material";
import SongInfoModal from "../song/SongInfoModal";

const Player = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const user = await supabase.auth.getUser();
    const id = user.data.user?.id;

    setLoading(true);
    const { data, error } = await supabase.from("Songs").select("*").eq("user_id", id);

    if (error) {
      throw error;
      setLoading(false);
      return;
    }

    setSongs(data || []);
    setLoading(false);
  };

  const handleSongClick = (index: number) => {
    setCurrentSongIndex(index);
    setIsModalOpen(true);
    togglePlayPause();
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
        {loading ? (
          <CircularProgress />
        ) : songs.length > 0 ? (
          <div className="flex flex-col gap-4 mb-4 w-full max-w-lg">
            {songs.map((song, index) => (
              <div
                key={song.id}
                onClick={() => handleSongClick(index)}
                className="cursor-pointer p-2 border rounded-lg shadow-md"
              >
                <Song {...song} onSongClick={() => handleSongClick(index)}/>
              </div>
            ))}
          </div>
        ) : (
          <p>There Are No Songs Here Yet</p>
        )}
        <Controls
          type="range"
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
          />
        )}
      </div>
  );
};

export default Player;


