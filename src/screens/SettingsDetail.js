import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSettings } from '../components/settings/settingscontext';
import { SettingsStyles } from '../styles/styles';

export default function SettingsDetail ({ route, navigation }) {
  const route = useRoute();
  const { setting } = route.params;
  const { settings, toggleColorScheme, toggleRichTextEditor } = useSettings();

  const renderContent = () => {
    switch (setting) {
      case 'Color Scheme':
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24 }}>Dark Mode</Text>
            <Switch value={settings.colorScheme === 'dark'} onValueChange={toggleColorScheme} />
          </View>
        );
      case 'Editor Type':
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24 }}>Use Rich Text Editor</Text>
            <Switch value={settings.useRichTextEditor} onValueChange={toggleRichTextEditor} />
          </View>
        );
      default:
        return <Text style={{ fontSize: 24 }}>Unknown Setting</Text>;
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 32, marginBottom: 20 }}>{setting}</Text>
      {renderContent()}
    </View>
  );
};