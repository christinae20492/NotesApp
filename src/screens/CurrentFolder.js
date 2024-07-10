import React, {useLayoutEffect, useState, useCallback} from 'react';
import { View, Text, Pressable, FlatList, TextInput, RefreshControl, Modal } from 'react-native';
import { deleteFolder, addNotesToFolder, editFolderTitle, removeNotesFromFolder } from '../utils/folderutil';
import { deleteNote, loadNotes, notePress } from '../utils/noteutility';
import { styles, CurrentFolderStyles } from '../styles/styles';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function CurrentFolder ({route, navigation}) {
  const { folder } = route.params || {};
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [inputText, setInputText] = useState(folder.title);
  
  let newFolders=[];
  const numColumns = 3;

  
  const fetchNotes = useCallback(async () => {
    const loadedNotes = await loadNotes();
    setNotes(Array.isArray(loadedNotes) ? loadedNotes : []);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [fetchNotes])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotes().then(() => setRefreshing(false));
  }, [fetchNotes]);

    useLayoutEffect(() => {
        navigation.setOptions({
          title: folder.title || 'Current Folder',
        });
      }, [navigation, folder.title]);

      if (folder===false) {
        return (
          <View style={styles.MainContainer}>
            <Text style={styles.noNotesText}>Folder not found.</Text>
          </View>
        );
      }
      
      const modalNotes = ({item}) =>(
        <Pressable
          style={[styles.noteItem]}
          onPress={() => handleSelectNote(item.id)}>
          <AntDesign name="form" size={24} color="black" />
          {modalVisible && (
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

      const renderFolderItem = ({ item }) => (
        <Pressable
        style={[styles.noteItem, selectedNotes.includes(item.id) && styles.selectedItem]}
        onPress={() => notePress(item.id, isMultiSelect, navigation, notes, selectedNotes, setSelectedNotes, folder.notes)}
          onLongPress={()=>deleteNote(item.id, setNotes, navigation)}>
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
          <Text style={styles.noNotesText}>{item.id}</Text>
        </Pressable>
      );

      const handleSelectNote = (noteId) => {
        setSelectedNotes((prevSelectedNotes) =>
          prevSelectedNotes.includes(noteId)
            ? prevSelectedNotes.filter((id) => id !== noteId)
            : [...prevSelectedNotes, noteId]
        );
      };    

      const handleAddNoteToFolder = async ()=>{
        if (selectedNotes===0) {setModalVisible(false)} else {
        await addNotesToFolder(selectedNotes, folder.id, setNotes, setFolders);
        setSelectedNotes([]);
        setModalVisible(false);
        fetchNotes()}
      }

      const handleRemoveNotesFromFolder = async () => {
        await removeNotesFromFolder(selectedNotes, folder.id, setNotes, setFolders,navigation);
        setSelectedNotes([]);
        setModalVisible(false);
        fetchNotes()}
      
    return (
        <View style={{flex:1}}>
          <Modal
          
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
            <View style={CurrentFolderStyles.FolderModal}>

              <FlatList
            data={notes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={modalNotes}
            numColumns={numColumns}
            contentContainerStyle={styles.listContent}
          />
          
          <View>
          <Pressable onPress={() => handleAddNoteToFolder()} style={CurrentFolderStyles.ModalLeftButton}>
          <AntDesign name="checkcircleo" size={28} color="black" />
        </Pressable>
        <Pressable onPress={() => setModalVisible(false)} style={CurrentFolderStyles.ModalRightButton}>
        <AntDesign name="closesquare" size={28} color="#e34653" />
          </Pressable></View></View>
      </Modal>
            <View style={styles.OptionsBar}>
        <Pressable>
        <AntDesign name="edit" size={24} color="grey" style={{padding:5}} onPress={() => setTextInputVisible(!textInputVisible)} />
        </Pressable>
        <Pressable>
        <AntDesign name="addfile" size={24} color="grey" style={{padding:5}} onPress={()=>setModalVisible(!modalVisible)} />
        </Pressable>
        <Pressable onPress={()=>deleteFolder(folder.id, setFolders, navigation)}>
        <AntDesign name="delete" size={24} color="grey" style={{padding:5}} />
        </Pressable>
        {isMultiSelect ? (
        <Pressable onPress={()=>{
        if (selectedNotes.length===0) {setIsMultiSelect(false)} else{
        handleRemoveNotesFromFolder()}}}>
        <AntDesign name="minuscircleo" size={24} color="#e34653" />
        </Pressable>
          ) : (
            <Pressable onPress={() => setIsMultiSelect(true)}><AntDesign name="minuscircleo" size={24} color="grey" /></Pressable>)}

        {textInputVisible && (
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => editFolderTitle(folder.id, inputText, navigation, setTextInputVisible)}
        />
      )}
      </View>
      <View style={CurrentFolderStyles.FolderNoteContainer}>
      {folder.notes.length === 0 ? (
          <Text style={styles.noNotesText}>This folder doesn't have any content. You should add something!</Text>
        ) : (
          <FlatList
            data={folder.notes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderFolderItem}
            numColumns={numColumns}
            contentContainerStyle={styles.listContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>
        </View>
    );
}