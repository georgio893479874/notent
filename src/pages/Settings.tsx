import { useEffect, useState } from "react";
import { supabase } from "@services/SupabaseClientService";
import Sidebar from "@components/primitives/Sidebar";

const Settings = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });

    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } 
        
        else {
          document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    useEffect(() => {
      const fetchThemeSettings = async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        const user = data?.user;

        if (user) {
          const email = user.email;
          const { data: userSettings, error: settingsError } = await supabase.from("Users").select("dark_mode").eq('email', email).single();

          if (settingsError) {
            throw settingsError;
          } 
          
          else {
            if (userSettings.dark_mode !== darkMode) {
                setDarkMode(userSettings.dark_mode);
                localStorage.setItem('darkMode', userSettings.dark_mode);
            }
          }
        }
      }

      fetchThemeSettings();
    }, []);

    const handleThemeChange = (event: any) => {
        setDarkMode(event.target.value === 'dark');
    };

    const saveSettings = async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        const user = data?.user;

        if (user) {
            const email = user.email;
            const { error } = await supabase.from("Users").update({ dark_mode: darkMode }).eq('email', email);

            if (error) {
                throw error;
            }
        }
    };

    return (
      <>
        <Sidebar/>
        <div className="settings p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mx-4 my-6 sm:mx-auto sm:max-w-xl">
          <h2 className="text-3xl font-semibold mb-6 dark:text-white">Theme Settings</h2>
          <div className="setting-item mb-6">
            <label htmlFor="theme" className="block mb-2 text-lg font-medium dark:text-gray-300">Theme:</label>
            <select
                id="theme"
                value={darkMode ? 'dark' : 'light'}
                onChange={handleThemeChange}
                className="p-2 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-300"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>
          <button
              onClick={saveSettings}
              className="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow transition-colors"
          >
              Save Settings
          </button>
        </div>
      </>
    );
}

export default Settings;



