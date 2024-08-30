import { ISongInfoModal } from "@/interfaces/SongInfoModalInterface";
import { useEffect, useState } from "react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill, BsSkipBackwardFill, BsSkipForwardFill, BsChevronDown } from "react-icons/bs";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 overflow-auto dark:bg-opacity-80">
      {isMobile ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50 overflow-auto">
          <div className="w-full h-full flex flex-col items-center p-6">
            <div className="w-full flex justify-between items-center mb-4">
              <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <button onClick={onClose} className="text-gray-700 dark:text-gray-300 text-2xl">
                <BsChevronDown />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img src={song.image_link} alt={song.article} className="rounded-lg w-64 h-64 object-cover" />
              <div className="mt-4 mb-2 text-center">
                <h2 className="text-2xl font-bold truncate dark:text-white">{song.article}</h2>
                <p className="text-gray-600 dark:text-gray-400 truncate">{song.author}</p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center mt-4">
              <div className="w-full flex items-center justify-between px-4 mb-2">
                <span className="text-sm dark:text-gray-400">{current}</span>
                <input 
                  type={type}
                  min={min}
                  max={max}
                  value={value}
                  onChange={onChange}
                  ref={progressBar} 
                  className="w-full mx-2 bg-gray-200 dark:bg-gray-600"
                />
                <span className="text-sm dark:text-gray-400">0</span>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button onClick={skipBegin} className="text-3xl mx-2 dark:text-gray-300">
                  <BsSkipBackwardFill />
                </button>
                <button onClick={() => onPlayPause(song)} className="text-5xl mx-4 text-blue-500 dark:text-blue-400">
                  {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
                </button>
                <button onClick={skipEnd} className="text-3xl mx-2 dark:text-gray-300">
                  <BsSkipForwardFill />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex flex-col bg-black bg-opacity-70 dark:bg-opacity-80 z-50" style={{marginLeft: "20%"}}>
          <div className="flex flex-row h-full relative">
            <div className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col justify-center items-center p-8">
              <button onClick={onClose} className="absolute top-4 left-4 text-gray-700 dark:text-gray-300 text-2xl">
                <BsChevronDown />
              </button>
              <img src={song.image_link} alt={song.article} className="rounded-lg w-64 h-64 object-cover" />
              <div className="mt-4 text-center">
                <h2 className="text-5xl font-bold">{song.article}</h2>
                <p className="text-gray-400">{song.author}</p>
              </div>
              <div className="w-full flex flex-col items-center mt-8">
                <div className="w-full flex items-center justify-between px-4 mb-2">
                  <span className="text-sm">{current}</span>
                  <input 
                    type={type}
                    min={min}
                    max={max}
                    value={value}
                    onChange={onChange}
                    ref={progressBar} 
                    className="w-full mx-2 bg-gray-200 dark:bg-gray-600"
                  />
                  <span className="text-sm">0</span>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button onClick={skipBegin} className="text-3xl mx-2 dark:text-gray-300">
                    <BsSkipBackwardFill />
                  </button>
                  <button onClick={() => onPlayPause(song)} className="text-5xl mx-4 text-blue-500 dark:text-blue-400">
                    {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
                  </button>
                  <button onClick={skipEnd} className="text-3xl mx-2 dark:text-gray-300">
                    <BsSkipForwardFill />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongInfoModal;







