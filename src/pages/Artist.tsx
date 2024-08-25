import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/services/SupabaseClientService";
import Sidebar from "@/components/sidebar/Sidebar";

export interface IArtist {
  artist_id: string;
  artist_name: string;
  artist_avatar: string;
}

interface IAlbum {
  album_author_id: string;
  album_article: string;
  album_photo: string;
}

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<IArtist | null>(null);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchArtistData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
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
    };

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
      <Sidebar className="hidden lg:block" />
      <div className="min-h-screen text-white p-6 flex flex-col items-start lg:ml-64">
        <div className="flex flex-col lg:flex-row items-center mb-8 w-full">
          <div className="mb-4 lg:mb-0 lg:mr-6">
            <img
              className="rounded-full w-36 h-36 lg:w-42 lg:h-42"
              src={artist.artist_avatar}
              alt={artist.artist_name}
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-bold">{artist.artist_name}</h1>
            <p className="text-gray-400 mt-2 text-sm lg:text-base">82,736,050 monthly listeners</p>
            <div className="flex justify-center lg:justify-start items-center mt-4">
              <button className="bg-green-500 text-black px-4 py-2 rounded-full font-semibold">
                Play
              </button>
              <button
                className={`ml-2 lg:ml-4 px-4 py-2 rounded-full ${
                  isFollowing
                    ? 'bg-red-500 text-white'
                    : 'border border-gray-600'
                }`}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mb-8">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">Popular Releases</h2>
          <div className="flex flex-wrap justify-center lg:justify-start space-x-0 lg:space-x-4">
            {albums.map((album, idx) => (
              <Link to={`/album/${album.album_author_id}`} key={idx} className="w-36 lg:w-64 mb-4 lg:mb-0">
                <div>
                  <img
                    className="w-36 h-36 lg:w-64 lg:h-64 rounded-lg"
                    src={album.album_photo}
                    alt={album.album_article}
                  />
                  <p className="text-center mt-2 text-sm lg:text-base">{album.album_article}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Artist;