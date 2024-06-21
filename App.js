import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CurrentNote from './src/screens/CurrentNote';
import EditNote from './src/screens/EditNote';
import Toast from 'react-native-toast-message';
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
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
};

export default function App() {
  
  return (
  <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigator} options={{title:'Notebook'}}/>
        <Stack.Screen name="Create Note" component={NoteScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
         <Stack.Screen name="Current Note" component={CurrentNote} />
         <Stack.Screen name="Edit Note" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );
}
