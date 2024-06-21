import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { NoteScreenStyles } from '../styles/styles.js';
import { SaveNote } from '../utils/utility.js';
import { FontAwesome } from '@expo/vector-icons';
import { CenterButton } from '../utils/props.js';

export default function NoteScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
    const [newNote, setNewNote] = useState([]);

    const handleSaveNote = async () =>{
      await SaveNote (title, body, setNotes, setNewNote, navigation);
    }

    return (
        <View style={{flex:1}}>
        <View>
            <TextInput
        style={NoteScreenStyles.InputText}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={NoteScreenStyles.InputText}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline={true}
        numberOfLines={4}
      />
        </View>
         <View><Pressable style={NoteScreenStyles.SaveButton}>
            <FontAwesome name="save" size={24} color="black" onPress={handleSaveNote}/></Pressable>
            </View>
        </View>
    )
}