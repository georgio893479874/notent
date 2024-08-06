import { ISong } from "@/services/ControlsService";
import { useEffect, useState } from "react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";

interface ISongInfoModal {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  skipBegin: () => void;
  skipEnd: () => void;
  current: string;
  type: string;
  min: number;
  max: number;
  value: number;
  isPlaying: boolean;
  progressBar: React.RefObject<HTMLInputElement>;
  song: ISong;
  onClose: () => void;
  onPlayPause: (song: ISong) => void; // Виправив тип
}

const SongInfoModal: React.FC<ISongInfoModal> = ({ 
  song, 
  onClose, 
  onPlayPause, 
  isPlaying, 
  type, 
  min, 
  max, 
  value, 
  onChange, 
  progressBar, 
  skipBegin, 
  skipEnd, 
  current 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 overflow-auto">
      <div className={`bg-white rounded-lg shadow-lg ${isMobile ? 'w-full' : 'w-1/3'} flex flex-col items-center p-6`}>
        <div className="w-16 h-1 bg-gray-300 rounded-full mb-4"></div>
        <div className="flex flex-col items-center">
          <img src={song.image_link} alt={song.article} className={`rounded-lg ${isMobile ? 'w-48 h-48' : 'w-64 h-64'} object-cover`} />
          <div className="mt-4 mb-2 text-center">
            <h2 className="text-2xl font-bold truncate">{song.article}</h2>
            <p className="text-gray-600 truncate">{song.author}</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center mt-4">
          <div className="w-full flex items-center justify-between px-4 mb-2">
            <span className="text-sm">{current}</span>
            <input 
              type={type}
              min={min}
              max={max}
              value={value}
              onChange={onChange}
              ref={progressBar} 
              className="w-full mx-2"
            />
            <span className="text-sm">{song.duration}</span>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button onClick={() => onPlayPause(song)} className="text-3xl mx-2">
              <BsSkipBackwardFill onClick={skipBegin}/>
            </button>
            <button onClick={() => onPlayPause(song)} className="text-5xl mx-4 text-blue-500">
              {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
            </button>
            <button onClick={() => onPlayPause(song)} className="text-3xl mx-2">
              <BsSkipForwardFill onClick={skipEnd}/>
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button onClick={onClose} className="text-lg text-blue-500 py-2 px-4 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SongInfoModal;






