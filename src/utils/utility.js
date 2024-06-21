import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

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
          const getCurrentDate = () => {
            const date = new Date();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            const randomNumbers = Math.floor(10000 + Math.random() * 90000);
            return `${month}/${day}/${year}-${randomNumbers}`;
          };


    const NOTES_KEY='notes';

export const loadNotes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    failToast(`Failed to load notes: ${error}`);
    return [];
  }
};

export const SaveNote = async (title, body, setNotes, setNewNote, navigation) => {
  try {
    const existingNotes = await loadNotes();
    const newNote = { id: getCurrentDate(), title, body };
    const newNotes = [...existingNotes, newNote];

    setNotes(newNotes);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    setNewNote('');
    successToast('Note saved successfully!');
    navigation.navigate('Home');
  } catch (error) {
    failToast(`Failed to save note: ${error.message}`);
  }
};

export const deleteNote = async (id, setNotes, navigation) => {
  try {
    let existingNotes = await loadNotes();
    const newNotes = existingNotes.filter(note => note.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
     if (setNotes){
        setNotes(newNotes)
    }
    successToast('Note deleted successfully!');
    navigation.navigate('Home');
  } catch (error) {
    failToast(`Failed to delete note: ${error}`);
    console.log(error);
  }
};

export const editNote = async (id, title, body) => {
  try {
    const existingNotes = await loadNotes();
    const newNotes = existingNotes.map(note => note.id === id ? { ...note, title, body } : note);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    successToast('Note edited successfully!');
  } catch (error) {
    failToast(`Failed to edit note: ${error}`);
  }
};

export const deleteMultipleNotes = async (ids) => {
  try {
    const existingNotes = await loadNotes();
    const newNotes = existingNotes.filter(note => !ids.includes(note.id));
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    successToast('Notes deleted successfully!');
  } catch (error) {
    failToast(`Failed to delete notes: ${error}`);
  }
};
