import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import KeepAliveComponent from '@components/keepAlive/KeepAlive';
import AuthWrapper from '@components/register/AuthWrapper';
import { Register, SignIn, DefaultRoute, Profile, Settings, EditProfile, Portfolio, Radio, Albums, Artist, Album, Favorites } from './pages';
import PlayerWrapper from './components/player/PlayerWrapper';
import { PlayerProvider } from './context/PlayerContext';
import SidebarWrapper from './components/sidebar/SidebarWrapper';
import AllArtistAlbums from './pages/AllArtistAlbums';
import NavigationWrapper from './components/navigation/NavigationWrapper';

function App() {
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode && JSON.parse(savedDarkMode)) {
      document.documentElement.classList.add('dark');
    } 
    
    else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <PlayerProvider>
        <SidebarWrapper>
          <PlayerWrapper>
            <NavigationWrapper>
              <div className="app">
                <KeepAliveComponent/>
                <AuthWrapper>
                  <Routes>
                    <Route path="/" element={<Portfolio/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/player" element={<DefaultRoute/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/artist/:id" element={<Artist/>}/>
                    <Route path="/editprofile" element={<EditProfile/>}/>
                    <Route path="/radio" element={<Radio/>}/>
                    <Route path="/albums" element={<Albums/>}/>
                    <Route path="/album/:albumId" element={<Album/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/all-albums/:albumId" element={<AllArtistAlbums/>}/>
                  </Routes>
                </AuthWrapper>
              </div>
            </NavigationWrapper>
          </PlayerWrapper>
        </SidebarWrapper>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;

