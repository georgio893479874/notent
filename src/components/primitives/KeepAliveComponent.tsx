import { useEffect } from 'react';
import { supabase } from '@/services/SupabaseClientService';

const KeepAliveComponent = () => {
    async function keepAlive() {
        await supabase.from('Songs').select('id').limit(1);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            keepAlive();
        }, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default KeepAliveComponent;

