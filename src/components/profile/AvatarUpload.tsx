import { forwardRef, useEffect, useState } from 'react';
import { IconButton, Avatar } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { supabase } from '@/services/SupabaseClientService';

interface AvatarUploadProps {
  avatar: string;
  onAvatarChange: () => void;
  width: number;
  height: number;
  fontSize: number;
}

const AvatarUpload = forwardRef<HTMLInputElement, AvatarUploadProps> (({ 
  avatar, 
  onAvatarChange, 
  width, 
  height, 
  fontSize 
}, ref) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const { data, error } = await supabase.auth.getUser();

          if (error) {
            throw error;
          }

          setUser(data?.user);
        } 
        
        catch (error) {
          throw error;
        } 
        
        finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    }, []);

    useEffect(() => {
      if (avatar) {
        const img = new Image();

        img.src = avatar;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageLoaded(false);
      } 
      
      else {
        setImageLoaded(false);
      }
    }, [avatar]);

    if (isLoading) {
      return;
    }

    if (!user || !imageLoaded) return null;

    return (
      <div className="relative">
        <Avatar
          src={avatar}
          sx={{ width: width, height: height, fontSize: fontSize }}
        >
          {user.user_metadata?.first_name?.charAt(0)}
        </Avatar>
        <IconButton
          color="primary"
          component="label"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'grey.300',
            },
          }}
        >
          <input
            type="file"
            hidden
            ref={ref}
            onChange={onAvatarChange}
          />
          <PhotoCamera />
        </IconButton>
      </div>
    );
  }
);

export default AvatarUpload;


