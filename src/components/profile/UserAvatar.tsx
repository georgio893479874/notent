import React from 'react';
import { Avatar } from '@mui/material';
import { UserAvatarProps } from '@/interfaces/UserAvatarInterface';

const UserAvatar: React.FC<UserAvatarProps> = ({ src, initials, size = 110, fontSize = 35 }) => {
  return (
    <Avatar
      src={src}
      sx={{ width: size, height: size, fontSize: fontSize }}
    >
      {initials}
    </Avatar>
  );
};

export default UserAvatar;
