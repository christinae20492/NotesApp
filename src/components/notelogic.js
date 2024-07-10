import React from 'react';
import { Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { notePress } from '../utils/noteutility';

export const NoteItem = ({ item, isMultiSelect, selectedNotes, setSelectedNotes, navigation, handleDeleteNote }) => {
  return (
    <Pressable
      style={[styles.noteItem, selectedNotes.includes(item.id) && styles.selectedItem]}
      onPress={() => notePress(item.id, isMultiSelect, navigation, notes, selectedNotes, setSelectedNotes)}
      onLongPress={() => handleDeleteNote(item.id)}
    >
      <AntDesign name="form" size={24} color="black" />
      {isMultiSelect && (
        <AntDesign
          name={selectedNotes.includes(item.id) ? "checkcircle" : "checkcircleo"}
          size={24}
          color={selectedNotes.includes(item.id) ? "blue" : "black"}
          style={styles.checkbox}
        />
      )}
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noNotesText}>{item.id}</Text>
    </Pressable>
  );
};