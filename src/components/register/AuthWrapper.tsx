import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/services/SupabaseClientService';

const AuthWrapper = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (!data?.user) {
        if (location.pathname !== '/register' && location.pathname !== '/signin') {
          navigate('/signin');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default AuthWrapper;

