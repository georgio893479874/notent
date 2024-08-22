import { useEffect, useRef, useState } from 'react';
import { supabase } from "@/services/SupabaseClientService";
import EditProfileForm from '@/components/profile/EditProfileForm';

const EditProfile = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await supabase.auth.getUser();
      const id = user.data.user?.id;

      if (id) {
        const url = await supabase.from('Users').select('avatar_url').eq('auth_id', id).maybeSingle();

        setAvatar(url.data?.avatar_url ?? '');
        setUserId(id ?? null);
      }
    };

    fetchUser();
  }, []);  
  
  const handleChangeName = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (userId) {
      await supabase.from('Users').update({ name: name }).eq('auth_id', userId);
  
      const { data: { user } } = await supabase.auth.getUser();
  
      if (user?.user_metadata) {
        const { error: updateError } = await supabase.auth.updateUser({ data: { first_name: name } });
  
        if (updateError) {
          throw updateError;
        }
      } 
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId) {
      await supabase.from('Users').update({ email: email }).eq('auth_id', userId);
      await supabase.auth.updateUser({ email: email });
    }
  }; 

  const handleAvatarChange = async () => {
    if (!ref.current?.files || ref.current.files.length === 0) {
      return;
    }

    const file = ref.current.files[0];
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user?.id) {
      throw userError;
      return;
    }

    const fileName = `${Date.now()}_${file.name}_${userData.user.id}`;
    const { error: uploadError } = await supabase.storage.from('Avatars').upload(fileName, file);

    if (uploadError) {
      throw uploadError;
      return;
    }

    const { data: urlData } = supabase.storage.from('Avatars').getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      return;
    }

    const publicUrl = urlData.publicUrl;
    const { error: updateError } = await supabase.from('Users').update({ avatar_url: publicUrl }).eq('auth_id', userData.user.id);

    if (updateError) {
      throw updateError;
      return;
    }

    setAvatar(publicUrl);
  };

  return (
    <EditProfileForm
      handleChangeName={handleChangeName}
      handleChangeEmail={handleChangeEmail}
      avatar={avatar}
      handleAvatarChange={handleAvatarChange}
      name={name}
      ref={ref}
      email={email}
      setName={setName}
      setEmail={setEmail}
    />
  );
};

export default EditProfile;
















