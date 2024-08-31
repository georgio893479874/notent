import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const NavigationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const noNavigationRoutes = ['/', '/signin', '/register', '/settings', '/profile', '/editprofile'];
  
  const showNavigation = !noNavigationRoutes.includes(location.pathname);

  return (
    <>
      {children}
      {showNavigation && <Navigation/>}
    </>
  );
};

export default NavigationWrapper;
