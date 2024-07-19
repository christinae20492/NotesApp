import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { successToast, failToast} from './toast';
import { idGen, getCurrentDateTime } from './rangen';

const FOLDERS_KEY='folders';
const NOTES_KEY = 'notes';

//Folders functions

export const loadFolders = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FOLDERS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      failToast(`Failed to load folders: ${error}`);
      return [];
    }
  };
  
  export const createFolder = async (folderName, setFolders, setNewFolder, setTextInputVisible) => {
    try {
      const existingFolders = await loadFolders();
      const newFolder = { title: folderName, id: idGen(), dateCreated: getCurrentDateTime(), notes: [] };
      const newFolders = [...existingFolders, newFolder];
  
      setFolders(newFolders);
      await AsyncStorage.setItem(FOLDERS_KEY, JSON.stringify(newFolders));
      setNewFolder('');
      setTextInputVisible(false);
      
      successToast('New folder created!');
    } catch (error) {
      failToast(`Folder creation failed: ${error.message}`);
    }
  };
  
  export const moveNoteToFolder = async (noteId, folderId, setNotes, setFolders) => {
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      const foldersJson = await AsyncStorage.getItem(FOLDERS_KEY);
      let notes = notesJson ? JSON.parse(notesJson) : [];
      let folders = foldersJson ? JSON.parse(foldersJson) : [];
  
      const noteIndex = notes.findIndex(note => note.id === noteId);
      if (noteIndex === -1) {
        throw new Error('Note not found');
      }
  
      const [note] = notes.splice(noteIndex, 1);
  
      const folderIndex = folders.findIndex(folder => folder.id === folderId);
      if (folderIndex === -1) {
        throw new Error('Folder not found');
      }
  
      folders[folderIndex].notes.push(note);
  
      setNotes(notes);
      setFolders(folders);
      successToast('Note successfully moved into folder');
  
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      await AsyncStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
    } catch (error) {
      failToast(`Failed to move note to folder: ${error}`);
    }
  };

  export const addNotesToFolder = async (noteIds, folderId, setNotes, setFolders) => {
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      const foldersJson = await AsyncStorage.getItem(FOLDERS_KEY);
      let notes = notesJson ? JSON.parse(notesJson) : [];
      let folders = foldersJson ? JSON.parse(foldersJson) : [];
  
      const selectedNotes = notes.filter(note => noteIds.includes(note.id));
  
      notes = notes.filter(note => !noteIds.includes(note.id));
  
      const folderIndex = folders.findIndex(folder => folder.id === folderId);
      if (folderIndex === -1) {
        throw new Error('Folder not found');
      }
  
      folders[folderIndex].notes = [...folders[folderIndex].notes, ...selectedNotes];
  
      setNotes(notes);
      setFolders(folders);
      successToast('Notes added to folder');
  
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      await AsyncStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
    } catch (error) {
      console.error('Failed to add notes to folder:', error);
    }
  };
  
  export const removeNotesFromFolder = async (noteIds, folderId, setNotes, setFolders,navigation) => {
    try {
      const notesJson = await AsyncStorage.getItem(NOTES_KEY);
      const foldersJson = await AsyncStorage.getItem(FOLDERS_KEY);
      let notes = notesJson ? JSON.parse(notesJson) : [];
      let folders = foldersJson ? JSON.parse(foldersJson) : [];
  
      const folderIndex = folders.findIndex(folder => folder.id === folderId);
      if (folderIndex === -1) {
        throw new Error('Folder not found');
      }
  
      const selectedNotes = folders[folderIndex].notes.filter(note => noteIds.includes(note.id));
  
      folders[folderIndex].notes = folders[folderIndex].notes.filter(note => !noteIds.includes(note.id));
  
      notes = [...notes, ...selectedNotes];
  
      setNotes(notes);
      setFolders(folders);
      successToast('Notes removed from folder');
      navigation.navigate('Home');
  
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      await AsyncStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
    } catch (error) {
      console.error('Failed to remove notes from folder:', error);
    }
  };

  export const deleteFolder = async (id, setFolders, navigation) => {
    try {
      let existingFolders = await loadFolders();
      const newFolders = existingFolders.filter(folder => folder.id !== id);
      await AsyncStorage.setItem(FOLDERS_KEY, JSON.stringify(newFolders));
       if (setFolders){
          setFolders(newFolders)
      }
      successToast('Folder deleted successfully!');
      navigation.navigate('Home');
    } catch (error) {
      failToast(`Failed to delete note: ${error}`);
    }
  };

  export const editFolderTitle = async (id, title, navigation, setTextInputVisible) => {
    try {
      const existingFolders = await loadFolders();
      const newFolders = existingFolders.map(folder => folder.id === id ? { ...folder, title } : folder);
      await AsyncStorage.setItem(FOLDERS_KEY, JSON.stringify(newFolders));
      successToast('Name changed successfully!');
      setTextInputVisible(false);
      navigation.navigate('Home');
    } catch (error) {
      failToast(`Failed to edit folder: ${error}`);
    }
  };