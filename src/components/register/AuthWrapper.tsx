import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/services/SupabaseClientService';

const AuthWrapper = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (!data?.user) {
        if (location.pathname !== '/register' && location.pathname !== '/signin' && location.pathname !== '/') {
          navigate('/');
        }
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  return children;
};

export default AuthWrapper;

