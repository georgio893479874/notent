import { useState, useEffect } from 'react';
import { Avatar, Typography } from '@mui/material';
import { supabase } from '@services/SupabaseClientService';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { BsPenFill } from "react-icons/bs";
import Sidebar from '@components/primitives/Sidebar';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      } 
      
      else {
        const user = data?.user;
        setUser(user);

        if (user) {
          const { data: userData } = await supabase.from('Users').select('avatar_url').eq('auth_id', user.id).maybeSingle();

          setAvatar(userData?.avatar_url ?? '');
        }
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-1"> 
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md">
          <div className="flex items-start justify-between mb-6">
            <Link
              to="/"
              className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center"
            >
              <IoArrowBackOutline className="w-8 h-8"/>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Avatar
              src={avatar}
              sx={{ width: 56, height: 56, fontSize: "35px" }}
            >
              {!avatar && user.user_metadata?.first_name?.charAt(0)}
            </Avatar>
            <div className="mt-4 text-center">
              <Typography variant="h5" className="text-xl font-semibold">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </Typography>
              <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
                {user.email}
              </Typography>
            </div>
          </div>
          <Link
            to="/editprofile"
            className="mt-6 w-full bg-blue-500 dark:bg-blue-600 text-white rounded-md shadow-lg flex items-center justify-center py-2"
          >
            <Typography variant="button" className="flex items-center">
              Edit Profile
              <BsPenFill className="ml-2"/>
            </Typography>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;

