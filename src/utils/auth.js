import { getItem, setItem, removeItem } from './storage';
import Toast from 'react-native-toast-message';

const USER_KEY = 'user';

export const login = async (username, password, navigation) => {
  // Placeholder for actual authentication logic
  if (username === 'user' && password === 'password') {
    const user = { username };
    await setItem(USER_KEY, user);
    Toast.show({ type: 'success', text1: 'Login successful!' });
    navigation.navigate('Home');
  } else {
    Toast.show({ type: 'error', text1: 'Invalid username or password' });
  }
};

export const logout = async (navigation) => {
  try {
    await removeItem(USER_KEY);
    Toast.show({ type: 'success', text1: 'Logout successful!' });
    navigation.navigate('Login');
  } catch (error) {
    console.error('Failed to logout:', error);
    Toast.show({ type: 'error', text1: 'Failed to logout' });
  }
};

export const isAuthenticated = async () => {
  const user = await getItem(USER_KEY);
  return user !== null;
};
