import React, { useEffect, useState } from "react";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { IoVolumeHighOutline, IoLaptopOutline } from "react-icons/io5";
import { IoArrowUpOutline } from "react-icons/io5";
import { supabase } from "@/services/SupabaseClientService";
import { IControls } from "@/interfaces/ControlsInterface";

const Controls: React.FC<IControls> = ({
  type,
  song,
  min,
  max,
  duration,
  current,
  value,
  onChange,
  skipBegin,
  skipEnd,
  togglePlayPause,
  progressBar,
  audioPlayer,
  isPlaying,
  repeatMode,
  setRepeatMode,
  setIsModalOpen
}) => {
  const [albumName, setAlbumName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const fetchAlbumName = async () => {
      if (song?.album_id) {
        try {
          const { data, error } = await supabase.from("Albums").select("album_article").eq("album_id", song.album_id).single();

          if (error) {
            throw error;
            return;
          }

          setAlbumName(data?.album_article || "");
        } 
        
        catch (error) {
          throw error;
        }
      }
    };

    const checkIfFavorite = async () => {
      try {
        const user = await supabase.auth.getUser();
        const userId = user.data.user?.id;

        if (userId && song?.id) {
          const { data, error } = await supabase.from("FavoriteSongs").select("*").eq("user_id", userId).eq("song_id", song.id);

          if (error) {
            throw error;
            return;
          }

          setIsFavorite(data.length > 0);
        }
      } 
      
      catch (error) {
        throw error;
      }
    };

    fetchAlbumName();
    checkIfFavorite();
  }, [song]);

  const toggleFavorite = async () => {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (!userId || !song?.id) return;

      if (isFavorite) {
        const { error } = await supabase.from("FavoriteSongs").delete().eq("user_id", userId).eq("song_id", song.id);

        if (error) {
          throw error;
          return;
        }

        setIsFavorite(false);
      } 
      
      else {
        const { error } = await supabase.from("FavoriteSongs").insert(
          { 
            user_id: userId, 
            song_id: song.id 
          }
        );

        if (error) {
          throw error;
          return;
        }

        setIsFavorite(true);
      }
    } 
    
    catch (error) {
      throw error;
    }
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = Number(e.target.value);

    setVolume(volumeValue);

    if (audioPlayer.current) {
      audioPlayer.current.volume = volumeValue;
    }
  };

  const toggleRepeatMode = () => {
    setRepeatMode((prevMode) => {
      if (prevMode === 'off') return 'one';
      if (prevMode === 'one') return 'all';
      
      return 'off';
    });
  };

  return (
    <div 
      className="controls lg:h-24 h-20 flex flex-col items-center justify-between p-4 bg-[#212121] text-white fixed lg:bottom-0 bottom-14 left-0 right-0 shadow-lg z-10"
      onClick={() => { setIsModalOpen(true) }}
    >
      <div className="flex items-center gap-4 fixed right-8 bottom-20 sm:relative sm:right-auto sm:bottom-auto">
        <p className="md:flex hidden">{current}</p>
        <BsShuffle className="text-xl cursor-pointer text-gray-400 sm:flex hidden" />
        <BsFillSkipStartCircleFill
          onClick={skipBegin}
          className="text-2xl cursor-pointer text-gray-200"
        />
        {isPlaying ? (
          <BsFillPauseCircleFill
            onClick={togglePlayPause}
            className="text-3xl cursor-pointer text-gray-200"
          />
        ) : (
          <BsFillPlayCircleFill
            onClick={togglePlayPause}
            className="text-3xl cursor-pointer text-gray-200"
          />
        )}
        <BsSkipEndCircleFill
          onClick={skipEnd}
          className="text-2xl cursor-pointer text-gray-200"
        />
        <BsRepeat
          onClick={toggleRepeatMode}
          className={`text-xl cursor-pointer sm:flex hidden ${
            repeatMode === 'off' ? 'text-gray-400' : 'text-gray-200'
          }`}
        />
        <p className="md:flex hidden">{duration}</p>
      </div>
      <div className="flex-col items-center lg:mb-4 w-full max-w-md sm:flex hidden">
        <input
          type={type}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          ref={progressBar}
          className="w-full h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
          style={{
            backgroundSize: `${(value / max) * 100}% 100%`,
            backgroundImage: "linear-gradient(to right, white, white)",
          }}
        />
      </div>
      {song && (
        <div className="fixed left-4 flex items-center gap-4 z-20">
          <img
            src={song.image_link}
            className="lg:w-16 lg:h-16 w-12 h-12 rounded-sm"
          />
          <div className="flex flex-col text-start">
            <div className="flex gap-2">
              <span className="text-sm font-bold">{song.article}</span>
              <div className="flex gap-2">
                {isFavorite ? (
                  <FaHeart
                    className="text-white cursor-pointer"
                    onClick={toggleFavorite}
                  />
                ) : (
                  <FaRegHeart
                    className="text-white cursor-pointer"
                    onClick={toggleFavorite}
                  />
                )}
                <PiDotsThreeOutlineFill className="text-white cursor-pointer hidden sm:flex"/>
              </div>
            </div>
            <span className="text-xs text-gray-400">{song.author}</span>
            <span className="text-xs text-gray-500 lg:flex hidden">
              PLAYING FROM: {albumName}
            </span>
          </div>
        </div>
      )} 
      <div className="fixed right-4 gap-4 items-center lg:mt-5 lg:flex hidden">
        <div className="flex gap-4 items-center">
          {showVolumeSlider && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
            />
          )}
          <IoVolumeHighOutline
            className="text-xl cursor-pointer text-gray-200"
            size={24}
            onClick={toggleVolumeSlider}
          />
          <IoLaptopOutline
            className="text-xl cursor-pointer text-gray-200"
            size={24}
          />
          <IoArrowUpOutline
            className="text-xl cursor-pointer text-gray-200"
            size={24}
          />
        </div>
      </div>
      <audio ref={audioPlayer}></audio>
    </div>
  );
};

export default Controls;