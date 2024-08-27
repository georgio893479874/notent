import FavoriteAlbums from "@/components/favoriteAlbums/FavoriteAlbums";
import NavigationButtons from "@/components/NavigationButtons/NavigationButtons";
import Player from "@/components/player/Player";
import Sidebar from "@/components/sidebar/Sidebar"

const Albums = () => {
  return (
    <>  
        <NavigationButtons/>
        <div className="flex flex-col items-center justify-center p-4">
          <FavoriteAlbums/>
          <Player/>
        </div>
        <Sidebar/>
    </>
  )
}

export default Albums;