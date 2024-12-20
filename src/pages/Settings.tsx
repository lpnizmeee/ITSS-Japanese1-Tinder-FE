import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Nav } from '../components';

export const Settings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    language: 'English', // Default language
    theme: 'Light', // Default theme
    fontSize: 'Medium', // Default font size
    notifications: true, // Default notification setting
  });

  useEffect(() => {
    // Fetch initial settings from API or local storage
    const fetchSettings = async () => {
      try {
        const response = await axios.get<{ settings: typeof settings }>(
          'http://localhost:8888/api/settings', // Replace with your API endpoint
          { withCredentials: true }
        );
        setSettings(response.data.settings);
      } catch (err: any) {
        console.error('Error fetching settings:', err);
        // Handle error, e.g., show an error message
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Type assertion for checked property

    setSettings({
      ...settings,
      [name]: name === 'notifications' ? checked : value,
    });
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // Send logout request to API
      await axios.post(
        'http://localhost:8888/api/users/logout', // Replace with your API endpoint
        {},
        { withCredentials: true }
      );
      // Redirect to login page or home page
      navigate('/login'); // Replace with your desired route
    } catch (err: any) {
      console.error('Error logging out:', err);
      // Handle error, e.g., show an error message
    }
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div>
      <Nav />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <div className='settings-back-icon justify-start'>
            <button onClick={() => navigate(-1)} className="text-black text-2xl">
              &larr; Back
            </button>
          </div>
          <div className="settings-header flex items-center justify-center mb-6 mt-6">
            <h2 className="text-5xl font-semibold text-black flex items-center justify-center mb-8 mr-4">
              ⚙️Settings
            </h2>
            {/* Add an empty div to maintain spacing */}
            <div></div>
          </div>
          <div className="settings-options space-y-4">
            {/* Language */}
            <div>
              <label htmlFor="language" className="block font-bold mb-2">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleSettingChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="English">English</option>
                <option value="Japanese">日本語</option>
                <option value="Vietnamese">Tiếng Việt</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block font-bold mb-2">Theme</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="theme"
                    value="Light"
                    checked={settings.theme === 'Light'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">Light</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="theme"
                    value="Dark"
                    checked={settings.theme === 'Dark'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">Dark Mode</span>
                </label>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block font-bold mb-2">Font Size</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fontSize"
                    value="Small"
                    checked={settings.fontSize === 'Small'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">Small</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fontSize"
                    value="Medium"
                    checked={settings.fontSize === 'Medium'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">Medium</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="fontSize"
                    value="Large"
                    checked={settings.fontSize === 'Large'}
                    onChange={handleSettingChange}
                  />
                  <span className="ml-2">Large</span>
                </label>
              </div>
            </div>

            {/* Profile */}
            <div>
              <button
                onClick={handleProfileClick}
                className="flex items-center text-white hover:underline"
              >
                <span>Profile</span>
                <span className="ml-2">&rarr;</span>
              </button>
            </div>

            {/* Notifications */}
            <div>
              <label className="block font-bold mb-2">Notifications</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={() => setSettings(prevSettings => ({
                      ...prevSettings,
                      notifications: !prevSettings.notifications
                    }))}
                  />
                  <span className="ml-2">{settings.notifications ? 'On' : 'Off'}</span>
                </label>
              </div>
            </div>

            {/* Password & Account (Placeholder) */}
            <div>
              <label className="block font-bold mb-2">Password & Account</label>
              {/* Add content for password and account settings here */}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};