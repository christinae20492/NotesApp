import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const PROFILE_KEY = 'profile';
const successToast = (message) => {
  Toast.show({
    type: 'success',
    text1: message,
  });
};

const failToast = (message) => {
  Toast.show({
    type: 'error',
    text1: message,
  });
};

export const loadProfile = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    //successToast('Profile loaded.');
  } catch (error) {
    failToast('Profile load unsuccessful.')
    console.log(error);
  }
};

export const saveProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    successToast('New profile successfully created!')
  } catch (error) {
    failToast('Profile save unsuccessful.')
    console.log(error);
  }
};
