import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CurrentNote from './src/screens/CurrentNote';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create Note" component={NoteScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
         <Stack.Screen name="Current Note" component={CurrentNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
