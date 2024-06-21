import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, FlatList, } from 'react-native';
import { styles } from '../styles/styles';
import { loadNotes, deleteNote } from '../utils/utility';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const numColumns = 2;

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  let note=[];

  const fetchData = useCallback(async () => {
    const loadedNotes = await loadNotes();
    setNotes(Array.isArray(loadedNotes) ? loadedNotes : []);
  }, []);

  const handleDeleteNote = async (id) => {
    await deleteNote(id, setNotes, navigation);
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  
const renderItem = ({ item }) => (
  <Pressable
    style={[styles.noteItem, selectedNotes.includes(item.id) && styles.selectedItem]}
    onPress={() => navigation.navigate('Current Note', { note: item })}
    onLongPress={()=>handleDeleteNote(item.id, setNotes, navigation)}>
    <AntDesign name="form" size={24} color="black" />
    <Text style={styles.noteTitle}>{item.id}</Text>
    <Text style={styles.noNotesText}>{item.title}</Text>
  </Pressable>
);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.noteContainer}>
        {notes.length === 0 ? (
          <Text style={styles.noNotesText}>No notes available. Add a note to get started!</Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            numColumns={numColumns}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
      <View>
      </View>
<View style={styles.refreshButtonContainer}>
      <AntDesign name="reload1" size={24} color="black" onPress={fetchData}/>
      </View>
      <Pressable style={styles.CreateNote}>
          <Entypo name="add-to-list" size={24} color="black" onPress={() => navigation.navigate('Create Note')}/>
        </Pressable>
    </View>
  );
}


