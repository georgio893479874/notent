import bcrypt from 'bcryptjs';
import { supabase } from '@/services/SupabaseClientService';

interface IAuthService {
  name?: string;
  email: string;
  password: string;
}

export const handleSignUp = async ({ name, email, password }: IAuthService) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = supabase.auth.getUser();
    const id = (await user).data.user?.id;

    const { error: authError } = await supabase.auth.signUp({
      password,
      email,
      options: {
        data: {
          first_name: name,
        },
      }
    });

    if (authError) {
      throw authError;
    }

    const { error: insertError } = await supabase.from('Users').insert([
      {
        name,
        email,
        password: hashedPassword,
        auth_id: id,
      },
    ]);

    if (insertError) {
      throw insertError;
    }

    return { error: null };
  } 
  
  catch (error: any) {
    return { error: error.message || error };
  }
};

export const handleSignIn = async ({ email, password }: IAuthService) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { error: null };
  } 
  
  catch (error: any) {
    return { error: error.message || error };
  }
};

export const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  catch (error: any) {
    return { error: error.message || error };
  }
}