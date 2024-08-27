import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/services/SupabaseClientService";
import Sidebar from "@/components/sidebar/Sidebar";
import { FaPlay } from "react-icons/fa";

export interface IArtist {
  artist_id: string;
  artist_name: string;
  artist_avatar: string;
}

interface IAlbum {
  album_author_id: string;
  album_article: string;
  album_photo: string;
  album_id: string;
  public_date: string;
}

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<IArtist | null>(null);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const showAll = false;

  const sortedAlbums = [...albums].sort((a, b) => new Date(a.public_date).getTime() - new Date(b.public_date).getTime());

  const visibleAlbums = showAll ? sortedAlbums : sortedAlbums.slice(0, 5);

  useEffect(() => {
    const fetchArtistData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
        return;
      }

      if (data.user) {
        setUserId(data.user.id);
      }

      const { data: artistData, error: artistError } = await supabase.from('Artists').select('*').eq('artist_id', id).single();

      if (artistError) {
        throw artistError;
      } 
      
      else {
        setArtist(artistData);
      }

      const { data: albumData, error: albumError } = await supabase.from('Albums').select('*').eq('album_author_id', id);

      if (albumError) {
        throw albumError;
      } 
      
      else {
        setAlbums(albumData);
      }

      const { data: followingData, error: followingError } = await supabase.from('Followings').select('*').eq('user_id', userId).eq('artist_id', id).single();

      if (followingError) {
        throw followingError;
      }

      if (followingData) {
        setIsFollowing(true);
      }
    }

    fetchArtistData();
  }, [id]);

  const handleFollow = async () => {
    const { error } = await supabase.from('Followings').insert([
      { 
        user_id: userId, 
        artist_id: id,
      },
    ]);

    if (error) {
      throw error;
    } 
    
    else {
      setIsFollowing(true);
    }
  };

  const handleUnfollow = async () => {
    const { error } = await supabase.from('Followings').delete().eq('user_id', userId).eq('artist_id', id);

    if (error) {
      throw error;
    } 
    
    else {
      setIsFollowing(false);
    }
  };

  if (!artist) return null;

  return (
    <>
      <Sidebar />
      <div className="min-h-screen text-white flex flex-col lg:ml-64 p-6">
        <div className="relative mb-8 w-full h-56 lg:h-80 bg-gray-800 overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={artist.artist_avatar}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
            <div className="text-white p-4 rounded-lg">
              <h1 className="text-xl lg:text-7xl font-bold">{artist.artist_name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-500 text-black p-4 rounded-full font-semibold">
                <FaPlay/>
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  isFollowing ? 'bg-red-500 text-white' : 'border border-gray-600'
                }`}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mb-24">
          <div className="lg:flex justify-end mb-4 mr-12 hidden">
            {albums.length > 4 && (
              <Link
                to={`/all-albums/${artist.artist_id}`}
                className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                Show More
              </Link>
            )}
          </div>
          <div className="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-start gap-4">
            {visibleAlbums.map((album, idx) => (
              <Link to={`/album/${album.album_id}`} key={idx} className="w-full lg:w-64 mb-4">
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="w-auto h-full rounded-lg object-cover max-w-64"
                    src={album.album_photo}
                    alt={album.album_article}
                  />
                  <div className="text-center mt-2 text-sm lg:text-base">
                    <p>{album.album_article}</p>
                    <p className="text-gray-400 text-xs lg:text-sm">
                      {(album.public_date).split('-')[0]}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {albums.length > 4 && (
            <div className="flex justify-center mt-4 lg:hidden">
              <Link
                to={`/all-albums/${artist.artist_id}`}
                className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
              >
                Show More
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Artist;