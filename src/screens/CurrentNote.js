import React, {useLayoutEffect} from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteNote } from '../utils/utility';
import { CurrentNoteStyles } from '../styles/styles';

export default function CurrentNote ({ route,navigation }) {
  const { note } = route.params || {};
  let newNotes=[];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: note.title || 'Current Note',
    });
  }, [navigation, note.title]);

  const handleDeleteNote = async (id) => {
    await deleteNote(id, null, navigation);
  };

  if (note===false) {
    return (
      <View style={CurrentNoteStyles.container}>
        <Text style={CurrentNoteStyles.errorText}>No note found</Text>
      </View>
    );
  }

  return (
    <View style={CurrentNoteStyles.container}>
      <View>
      <Text style={CurrentNoteStyles.body}>{note.body}</Text></View>
      <Pressable style={CurrentNoteStyles.DeletingNote}>
      <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" onPress={()=>handleDeleteNote(note.id, null, navigation)}/>
      </Pressable>
      <Pressable style={CurrentNoteStyles.EditingNote}>
      <MaterialCommunityIcons name="lead-pencil" size={24} color="black" onPress={() => navigation.navigate('Edit Note', { note })}/>
      </Pressable>
    </View>
  );
}

const styles=StyleSheet.create({
container:{
flex:1,
padding:30,
justifyContent:'center',
alignItems:'center',
marginTop:-480
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
body: {
  fontSize: 16,
},
DeletingNote:{
  backgroundColor:'#dedede',
    borderRadius:45,
    padding:13,
    position:'absolute',
    bottom:30,
    left:70
},
EditingNote:{
  backgroundColor:'#dedede',
    borderRadius:45,
    padding:13,
    position:'absolute',
    bottom:30,
    right:70
}
})