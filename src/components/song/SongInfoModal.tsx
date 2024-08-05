import { useEffect, useState } from "react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";

const SongInfoModal = ({ song, onClose, onPlayPause, isPlaying }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className={`bg-white rounded-lg shadow-lg p-4 ${isMobile ? 'w-80' : 'w-full h-full flex'}`}>
        {isMobile ? (
          <div className="flex flex-col items-center">
            <img src={song.image_link} alt={song.article} className="w-full h-auto mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">{song.article}</h2>
            <p className="text-gray-600 mb-4">Author: {song.author}</p>
            <div className="flex items-center justify-around w-full">
              <button onClick={() => onPlayPause(song)} className="text-3xl">
                {isPlaying ? (
                    <BsFillPauseCircleFill
                        className="cursor-pointer h-12 w-12" 
                    />
                ) : (
                    <BsFillPlayCircleFill 
                        className="cursor-pointer h-12 w-12" 
                    />
                )}
              </button>
              <button onClick={onClose} className="text-lg bg-blue-500 text-white py-2 px-4 rounded">Close</button>
            </div>
          </div>
        ) : (
          <div className="flex w-full h-full">
            <div className="w-1/3">
              <img src={song.image_link} alt={song.article} className="w-full h-auto rounded-lg" />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold">{song.article}</h2>
                <p className="text-xl text-gray-600">Author: {song.author}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={() => onPlayPause(song)} className="text-4xl">
                  {isPlaying ? (
                      <BsFillPauseCircleFill 
                          className="cursor-pointer h-12 w-12" 
                      />
                  ) : (
                      <BsFillPlayCircleFill 
                          className="cursor-pointer h-12 w-12" 
                      />
                  )}
                </button>
                <button onClick={onClose} className="text-lg bg-blue-500 text-white py-2 px-4 rounded">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongInfoModal;


