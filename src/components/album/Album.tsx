interface IAlbum {
  article: string;
  album_photo: string;
}

const Album = ({ article, album_photo }: IAlbum) => {
  return (
    <div className="bg-black p-4 w-60">
      <img 
        src={album_photo}
        alt="Album Cover" 
        className="w-full h-auto rounded-lg mb-3"
      />
      <div>
        <h3 className="text-white text-lg font-semibold truncate">{article}</h3>
      </div>
    </div>
  );
}

export default Album;


