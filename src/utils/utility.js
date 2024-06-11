import React from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export const loadNotes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('notes');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Failed to load notes:', error);
    return [];
  }
};

export const SaveNote = async (title, body, notes, setNotes, setNewNote, navigation) => {
  try {
    const noteOnSave = () => {
      ToastAndroid.showWithGravity(
        'Note saved successfully!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    };
    const newNote = { title, body };
    const newNotes = [...notes, newNote];

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setNewNote('');
noteOnSave();
  } catch (error) {
    console.error('Failed to save note:', error);
  }
  navigation.navigate('Home');
  loadNotes();
};