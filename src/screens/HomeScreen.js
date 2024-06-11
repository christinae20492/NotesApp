import React, { useState, useCallback } from 'react';
import { View, Text, Button, Image, TouchableOpacity, FlatList, RefreshControl,Dimensions } from 'react-native';
import { StyleSheet } from 'react-native'; 
import { loadNotes } from '../utils/utility';

const { width } = Dimensions.get('window');
const itemMargin = 10;
const numColumns = 2;
const itemWidth = (width - (numColumns + 1) * itemMargin) / numColumns;

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  let note=[];

  const fetchData = useCallback(async () => {
    const loadedNotes = await loadNotes();
    setNotes(Array.isArray(loadedNotes) ? loadedNotes : []);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate('Current Note', { note: item })}
    >
      <Text style={styles.noteTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.MainContainer}>
      <View>
        <Text style={styles.HeaderText}>Notebook</Text>
      </View>
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
      <View style={styles.refreshButtonContainer}>
        <Button title="Refresh" onPress={fetchData} />
      </View><View>
        <TouchableOpacity style={styles.CreateNote}>
          <Button title="New" onPress={() => navigation.navigate('Create Note')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


 const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 16,
  },
  HeaderText: {
    fontSize: 26,
    textAlign: 'center',
  },
  CreateNote: {
    position: 'absolute',
      width: 90,
    bottom: 20,
    left: 80
  },
  noteContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noNotesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  listContent: {
    padding: itemMargin,
  },
  noteItem: {
    width: itemWidth,
    margin: itemMargin / 2,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  noteTitle: {
    fontSize: 18,
  },
  newNoteButton: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});