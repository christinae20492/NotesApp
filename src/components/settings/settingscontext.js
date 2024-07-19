import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    colorScheme: 'light', // 'light' or 'dark'
    useRichTextEditor: true, // true for RichEditor, false for TextInput
  });

  const toggleColorScheme = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      colorScheme: prevSettings.colorScheme === 'light' ? 'dark' : 'light',
    }));
  };

  const toggleRichTextEditor = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      useRichTextEditor: !prevSettings.useRichTextEditor,
    }));
  };

  const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    primary: '#6200ee',
  };
  
  const darkTheme = {
    background: '#000000',
    text: '#ffffff',
    primary: '#bb86fc',
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleColorScheme, toggleRichTextEditor }}>
      {children}
    </SettingsContext.Provider>
  );
};
