import { IControls } from "@/interfaces/ControlsInterface";
import React from "react";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import { IoVolumeHighOutline, IoLaptopOutline } from "react-icons/io5";
import { IoArrowUpOutline } from "react-icons/io5";

const Controls: React.FC<IControls> = ({
  type,
  song,
  min,
  max,
  value,
  onChange,
  skipBegin,
  skipEnd,
  togglePlayPause,
  progressBar,
  audioPlayer,
  isPlaying,
}) => {
  return (
    <div className="controls lg:h-24 h-20 flex flex-col items-center justify-between p-4 bg-[#212121] text-white fixed md:bottom-0 bottom-14 left-0 right-0 shadow-lg z-10">
      <div className="flex items-center gap-4 fixed right-8 bottom-20 sm:relative sm:right-auto sm:bottom-auto">
        <BsShuffle className="text-xl cursor-pointer text-gray-400 sm:flex hidden"/>
        <BsFillSkipStartCircleFill onClick={skipBegin} className="text-2xl cursor-pointer text-gray-200"/>
        {isPlaying ? (
          <BsFillPauseCircleFill onClick={togglePlayPause} className="text-3xl cursor-pointer text-gray-200"/>
        ) : (
          <BsFillPlayCircleFill onClick={togglePlayPause} className="text-3xl cursor-pointer text-gray-200"/>
        )}
        <BsSkipEndCircleFill onClick={skipEnd} className="text-2xl cursor-pointer text-gray-200"/>
        <BsRepeat className="text-xl cursor-pointer text-gray-400 sm:flex hidden"/>
      </div>
      <div className="flex-col items-center mb-4 w-1/2 lg:flex hidden">
        <input
          type={type}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          ref={progressBar}
          className="w-3/4 h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
          style={{
            backgroundSize: `${(value / max) * 100}% 100%`,
            backgroundImage: "linear-gradient(to right, white, white)",
          }}
        />
      </div>
      { song && 
        <div className="fixed left-4 gap-4 flex">
          <img
            src={song.image_link}
            className="lg:w-16 lg:h-16 w-12 h-12 rounded-sm"
          />
          <div className="flex flex-col text-start">
            <span className="text-sm font-bold">{song.article}</span>
            <span className="text-xs text-gray-400">{song.author}</span>
            <span className="text-xs text-gray-500 sm:flex hidden">PLAYING FROM: {song.album_article}</span>
          </div>
        </div>
      }
      <div className="fixed right-4 gap-4 lg:mt-5 md:mt-2 md:flex hidden">
        <div className="flex gap-4">
          <IoVolumeHighOutline className="text-xl cursor-pointer text-gray-200" size={24}/>
          <IoLaptopOutline className="text-xl cursor-pointer text-gray-200" size={24}/>
          <IoArrowUpOutline className="text-xl cursor-pointer text-gray-200" size={24}/>
        </div>
      </div>
      <audio ref={audioPlayer}></audio>
    </div>
  );
};

export default Controls;


