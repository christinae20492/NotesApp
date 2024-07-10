import React from 'react';
import { AppNavigator } from './src/components/nav';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
}
