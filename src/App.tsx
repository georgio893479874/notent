import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import KeepAliveComponent from '@components/keepAlive/KeepAlive';
import AuthWrapper from '@components/register/AuthWrapper';
import Register from '@pages/Register';
import SignIn from '@pages/SignIn';
import DefaultRoutes from '@/pages/DefaultRoute';
import Profile from '@pages/Profile';
import Settings from '@pages/Settings';
import Search from "@pages/Search";
import EditProfile from '@pages/EditProfile';
import Portfolio from './pages/Portfolio';

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
      <div className="app">
        <KeepAliveComponent/>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<Portfolio/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/player" element={<DefaultRoutes/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/editprofile" element={<EditProfile/>}/>
          </Routes>
        </AuthWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;






