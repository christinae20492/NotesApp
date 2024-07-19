import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CurrentNote from '../screens/CurrentNote';
import EditNote from '../screens/EditNote';
import CurrentFolder from '../screens/CurrentFolder';
import SettingsScreen from '../screens/Settings';
import SettingsDetail from '../screens/SettingsDetail';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2c5edb',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{title:'Notebook'}}/>
        <Stack.Screen name="Create Note" component={NoteScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Current Note" component={CurrentNote} />
        <Stack.Screen name="Current Folder" component={CurrentFolder} />
        <Stack.Screen name="Edit Note" component={EditNote} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SettingsDetail" component={SettingsDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};