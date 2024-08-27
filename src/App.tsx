import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import KeepAliveComponent from '@components/keepAlive/KeepAlive';
import AuthWrapper from '@components/register/AuthWrapper';

import { 
  Register, 
  SignIn, 
  DefaultRoute, 
  Profile,
  Settings,
  Search,
  EditProfile,
  Portfolio,
  Radio,
  Albums,
  Artist,
  Album
} from './pages';
import PlayerWrapper from './components/player/PlayerWrapper';

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
      <PlayerWrapper>
        <div className="app">
          <KeepAliveComponent/>
          <AuthWrapper>
            <Routes>
              <Route path="/" element={<Portfolio/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/player" element={<DefaultRoute/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/settings" element={<Settings/>}/>
              <Route path="/artist/:id" element={<Artist/>}/>
              <Route path="/editprofile" element={<EditProfile/>}/>
              <Route path="/radio" element={<Radio/>}/>
              <Route path="/albums" element={<Albums/>}/>
              <Route path="/album/:albumId" element={<Album/>}/>
            </Routes>
          </AuthWrapper>
        </div>
      </PlayerWrapper>
    </BrowserRouter>
  );
}

export default App;






