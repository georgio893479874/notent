import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/services/SupabaseClientService';

export interface Album {
    album_id: string;
    album_article: string;
    album_photo: string;
    public_date: string;
}

const Albums: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const fetchFavoriteAlbums = async () => {
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError) {
                throw userError;
                return;
            }
            
            const userId = userData?.user?.id;

            if (userId) {
                const { data: favoritesData, error: favoritesError } = await supabase.from('FavoriteAlbums').select('album_id').eq('user_id', userId);

                if (favoritesError) {
                    throw favoritesError;
                    return;
                }

                const albumIds = favoritesData.map((favorite: { album_id: string }) => favorite.album_id);
                
                if (albumIds.length > 0) {
                    const { data: albumsData, error: albumsError } = await supabase.from('Albums').select('*').in('album_id', albumIds);

                    if (albumsError) {
                        throw albumsError;
                        return;
                    }

                    setAlbums(albumsData || []);
                }
            }
        };

        fetchFavoriteAlbums();
    }, []);

    return (
        <div className="p-4 md:p-8 lg:ml-64 2xl:ml-0 mt-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 md:mb-6 text-left text-white">Favorite Albums</h1>
                <div className="flex flex-col space-y-4">
                    {albums.map((album) => (
                        <Link
                            to={`/album/${album.album_id}`}
                            key={album.album_id}
                            className="flex items-center space-x-4 p-4  rounded-lg cursor-pointer transition"
                        >
                            <img
                                src={album.album_photo}
                                alt={album.album_article}
                                className="lg:w-64 w-44 object-cover rounded-md"
                            />
                            <div className="flex flex-col text-left">
                                <h3 className="text-white text-xl font-semibold">{album.album_article}</h3>
                                <p className="text-md text-gray-400">{(album.public_date).split('-')[0]}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Albums;
