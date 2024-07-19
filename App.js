import React from 'react';
import { AppNavigator } from './src/components/nav';
import { SettingsProvider } from './src/components/settings/settingscontext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SettingsProvider>
      <AppNavigator />
      <Toast />
    </SettingsProvider>
  );
}
