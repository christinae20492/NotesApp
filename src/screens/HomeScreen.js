import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, FlatList, RefreshControl} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { styles, HomeScreenStyles } from '../styles/styles';
import { loadNotes, deleteNote, deleteMultipleNotes, notePress } from '../utils/noteutility';
import { createFolder, loadFolders } from '../utils/folderutil';
import { SortPicker } from '../components/sortpicker';

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const numColumns = 3;

export default function HomeScreen({ navigation }) {

  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [inputText, setInputText] = useState('New folder');


  const fetchData = useCallback(async () => {
    const loadedNotes = await loadNotes();
    const loadedFolders = await loadFolders();
    setNotes(Array.isArray(loadedNotes) ? loadedNotes : []);
    setFolders(Array.isArray(loadedFolders) ? loadedFolders : []);
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );
  
 const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, [fetchData]);

  
    const handleDeleteMultipleNotes = async () => {
    await deleteMultipleNotes(selectedNotes, setNotes, isMultiSelect);
    setSelectedNotes([]);
    setIsMultiSelect(false);
  };

const handleDeleteNote = async (id) => {
    await deleteNote(id, setNotes, navigation);
  };

  const handleMoveNoteToFolder = async (noteId, folderId) => {
    await moveNoteToFolder(noteId, folderId, setNotes, setFolders);
  };

  const renderNote = ({ item }) => (
    <Pressable
      style={[styles.noteItem, selectedNotes.includes(item.id) && styles.selectedItem]}
      onPress={() => notePress(item.id, isMultiSelect, navigation, notes, selectedNotes, setSelectedNotes)}
      onLongPress={()=>handleDeleteNote(item.id, setNotes, navigation)}>
      <AntDesign name="form" size={24} color="black" />
      {isMultiSelect && (
          <AntDesign
            name={selectedNotes.includes(item.id) ? "checkcircle" : "checkcircleo"}
            size={24}
            color={selectedNotes.includes(item.id) ? "#2c5edb" : "black"}
            style={styles.checkbox}
          />
        )}
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteBody}>{item.id}</Text>
    </Pressable>
  );
  
  const renderFolder = ({ item }) => (
    <Pressable
      style={[HomeScreenStyles.folderitem//, selectedNotes.includes(item.id) && styles.selectedItem
      ]}
      onPress={() => navigation.navigate('Current Folder', { folder: item })}
      onLongPress={()=>deleteFolder(id, setFolders, navigation)}>
      <Entypo name="folder" size={26} color="#115df5" />
      <Text style={styles.noteTitle}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.MainContainer}>

  <View style={styles.OptionsBar}>
        <Pressable onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="sort-amount-up-alt" size={24} color="grey"  style={{padding:5}}/>
        </Pressable>
        <Pressable onPress={() => setTextInputVisible(!textInputVisible)}>
         <AntDesign name="addfolder" size={24} color="grey" style={{padding:5}}/>
        </Pressable>
      </View>

      {textInputVisible && (
        <TextInput
          style={HomeScreenStyles.textInput}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => createFolder(inputText, setFolders, setNewFolder, setTextInputVisible)}
        />
      )}
    
      <SortPicker notes={notes} setNotes={setNotes} visible={modalVisible} setVisible={setModalVisible} />

      <View style={HomeScreenStyles.FolderContainer}>
      <FlatList
            data={folders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderFolder}
            numColumns={numColumns}
            contentContainerStyle={styles.listContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
      </View>

      <View style={HomeScreenStyles.noteContainer}>
        {notes.length === 0 ? (
          <Text style={styles.noNotesText}>No notes available. Add a note to get started!</Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderNote}
            numColumns={numColumns}
            contentContainerStyle={styles.listContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>
     
<View style={styles.MultiSelectButton}>
{isMultiSelect ? (
        <Pressable style={styles.DeleteButton} onPress={()=>{
        if (selectedNotes.length===0) {setIsMultiSelect(false)} else{
        handleDeleteMultipleNotes(selectedNotes, setNotes, true)}}}>
          <AntDesign name="delete" size={24} color="#e34653" />
        </Pressable>
      ) : (
        <Pressable onPress={() => setIsMultiSelect(true)}>
          <AntDesign name="checkcircleo" size={24} color="black" />
        </Pressable>
      )}
      </View>
      <Pressable style={styles.CreateNote}>
          <Entypo name="add-to-list" size={24} color="black" onPress={() => navigation.navigate('Create Note')}/>
        </Pressable>
    </View>
  );
}


