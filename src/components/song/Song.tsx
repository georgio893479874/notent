import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import DropdownMenu from "./DropdownMenu";

interface ISongProps {
  article: string;
  author: string;
  image_link: string;
  audio_link: string;
  onSongClick: () => void;
}

const Song: React.FC<ISongProps> = ({
  article,
  author,
  image_link,
  onSongClick,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading && (
        <Skeleton className="song flex items-center gap-8 p-2 cursor-pointer rounded-lg animate-pulse">
          <Skeleton className="w-16 h-16 bg-gray-300 rounded-lg"></Skeleton>
          <Skeleton className="flex flex-col">
            <Skeleton className="w-40 h-4 bg-gray-300 rounded mb-2"></Skeleton>
            <Skeleton className="w-24 h-3 bg-gray-300 rounded"></Skeleton>
          </Skeleton>
        </Skeleton>
      )}

      {!loading && (
        <div
          className="song flex items-center gap-8 p-2 cursor-pointer rounded-lg"
          onClick={onSongClick}
        >
          <img src={image_link} className="w-16 h-16 object-cover rounded-lg"/>
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-semibold">{article}</h3>
            <p className="text-gray-600">{author}</p>
          </div>
          <div onClick={(e) => { e.stopPropagation() }}>
            <DropdownMenu article={article}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Song;
