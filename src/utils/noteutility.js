import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { successToast, failToast} from './toast';
import { idGen, getCurrentDateTime } from './rangen';

    const NOTES_KEY='notes';
    
//Notes functions

export const loadNotes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    failToast(`Failed to load notes: ${error}`);
    return [];
  }
};

export const SaveNote = async (title, body, category, setNotes, setNewNote, navigation) => {
  try {
    const existingNotes = await loadNotes();
    const newNote = { id: idGen(), title, body, category, dateCreated: getCurrentDateTime() };
   
    if (!title) {
      let untitledNumber = 1;
      let newTitle = `Untitled note ${untitledNumber}`;

      while (existingNotes.some(note => note.title === newTitle)) {
        untitledNumber += 1;
        newTitle = `Untitled note ${untitledNumber}`;
      }

      title = newTitle;
    }

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

export const editNote = async (id, title, body, navigation) => {
  try {
    const existingNotes = await loadNotes();
    const newNotes = existingNotes.map(note => note.id === id ? { ...note, title, body } : note);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    successToast('Note edited successfully!');
    navigation.navigate('Home');
  } catch (error) {
    failToast(`Failed to edit note: ${error}`);
  }
};

export const deleteMultipleNotes = async (ids, setNotes) => {
  try {
    const existingNotes = await loadNotes();
    const newNotes = existingNotes.filter(note => !ids.includes(note.id));
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    setNotes(newNotes);
    successToast('Notes deleted successfully!');
  } catch (error) {
    failToast(`Failed to delete notes: ${error}`);
  }
};

export const notePress = (id, isMultiSelect, navigation, notes, selectedNotes, setSelectedNotes, folderNotes = null) => {
  const currentNotes = folderNotes || notes;

  if (isMultiSelect) {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter(noteId => noteId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  } else {
    navigation.navigate('Current Note', { note: currentNotes.find(note => note.id === id) });
  }
};

export const sortNotes = (notes, sortBy) => {
  return [...notes].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'dateCreated') {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });
};