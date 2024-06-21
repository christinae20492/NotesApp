import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { editNote } from '../utils/utility';
import { FontAwesome } from '@expo/vector-icons';


export default function EditNote({ route, navigation }) {
  const { note } = route.params;
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');

  useEffect(() => {
    navigation.setOptions({
      title: 'Edit Note',
    });
  }, [navigation]);

  const handleEditNote = async () => {
    await editNote(note.id, title, body);
  };

  return (
    <View style={styles.container}>
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
        multiline
      /></View>
      <View><Pressable style={styles.SavedNote}>
            <FontAwesome name="save" size={24} color="black" onPress={handleEditNote}/></Pressable>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
padding:30,
alignItems:'center',
marginTop:10
  },
  SavedNote:{
    backgroundColor:'#dedede',
      borderRadius:65,
      padding:13,
      position:'absolute',
      top:555,
      left:-20
  },
  InputText:{
    padding:10,
    width:300,
    marginTop:5,
    marginBottom:10,
}
});
