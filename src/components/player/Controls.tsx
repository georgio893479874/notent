import { IControls } from "@/interfaces/ControlsInterface";
import React from "react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill } from "react-icons/bs";

const Controls: React.FC<IControls> = ({
  type,
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
  duration,
  current
}) => {
  return (
    <div className="controls flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg fixed bottom-20 md:bottom-6">
      <div className="flex items-center gap-2">
        <BsFillSkipStartCircleFill 
          onClick={skipBegin} 
          className="text-2xl cursor-pointer" 
        />
        {isPlaying ? (
          <BsFillPauseCircleFill 
            onClick={togglePlayPause} 
            className="text-2xl cursor-pointer" 
          />
        ) : (
          <BsFillPlayCircleFill 
            onClick={togglePlayPause} 
            className="text-2xl cursor-pointer" 
          />
        )}
        <BsSkipEndCircleFill 
          onClick={skipEnd} 
          className="text-2xl cursor-pointer" 
        />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <input
          type={type}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          ref={progressBar}
          className="flex-1 mx-2 bg-gray-200 dark:bg-gray-600"
        />
        <p className="text-sm">{current} / {duration}</p>
      </div>
      <audio ref={audioPlayer}></audio>
    </div>
  );
};

export default Controls;
