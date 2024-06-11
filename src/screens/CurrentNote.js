import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native'; 

export default function CurrentNote ({ route }) {
  const { note } = route.params || {};

  if (note===false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No note found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.body}>{note.body}</Text>
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
title:{
fontSize:35
},
body:{
fontSize:20
},
})