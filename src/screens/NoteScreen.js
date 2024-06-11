import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native'; 
import { SaveNote } from '../utils/utility.js';

export default function NoteScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
    const [newNote, setNewNote] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <View style={{flex:1, width:100}}>
        <View>
            <TextInput
        style={styles.InputText}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.InputText}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline={true}
        numberOfLines={4}
      />
        </View>
         <View><TouchableOpacity style={styles.SavedNote}><Button title="Create" onPress={async () => {
            await SaveNote(title, body, notes, setNotes, setNewNote, navigation)}} /></TouchableOpacity></View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    )
}

const styles = StyleSheet.create({

    MyAppHeaderText:{
    fontSize:26,
    },
    MyAppText:{
        fontFamily: 'Samsung Sans'
    },
    SavedNote:{
      width:120,
      position:'absolute',
      alignSelf:'center'
    },
    InputText:{
        padding:10,
        width:300,
        marginTop:5,
        marginBottom:10,
    }
    });