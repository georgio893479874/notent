import { forwardRef, useEffect, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { supabase } from '@/services/SupabaseClientService';

interface AvatarUploadProps {
  avatar: string;
  onAvatarChange?: () => void;
  width?: number;
  height?: number;
  fontSize: number;
}

const AvatarUpload = forwardRef<HTMLInputElement, AvatarUploadProps>(({ 
  avatar, 
  onAvatarChange, 
  width,
  height,
  fontSize
}, ref) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      } 
      
      else {
        setUser(data?.user);
      }
    };

    fetchUser();
  }, []);

  if (!user) return;

    return (
      <div className="relative">
        <Avatar src={avatar} sx={{ width: width, height: height, fontSize: fontSize }}>
          {user.user_metadata?.first_name?.charAt(0)}
        </Avatar>
        { onAvatarChange &&
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
        }
      </div>
    );
  }
);

export default AvatarUpload;
