import React, { useState, useRef, forwardRef } from 'react';
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { NoteScreenStyles, styles } from '../styles/styles.js';
import { SaveNote } from '../utils/noteutility.js';
import { FontAwesome } from '@expo/vector-icons';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

const RichTextEditor = forwardRef((props, ref) => (
  <RichEditor {...props} ref={ref} />
));

export default function NoteScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
    const [newNote, setNewNote] = useState([]);
    const [category, setCategory] = useState('Personal');
    const [bodyHeight, setBodyHeight] = useState(40);
    const richText = useRef();

    const handleSaveNote = async () =>{
      const bodyContent = await richText.current.getContentHtml();
      await SaveNote (title, bodyContent, category, setNotes, setNewNote, navigation);
    }
  
    const handleInsertLink = () => {
      Alert.prompt(
        "Insert Link",
        "Enter the URL of the link:",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: url => richText.current.insertLink(url) }
        ],
        "plain-text"
      );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
         
            <View style={{flex:1, position:'relative'}}>
        <View>
            <TextInput
        style={NoteScreenStyles.InputText}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
       <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={NoteScreenStyles.Picker}
        >
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Shopping List" value="Shopping List" />
          <Picker.Item label="School" value="School" />
        </Picker>
        <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertLink,
              actions.keyboard,
              actions.heading1,
              actions.insertBulletsList,
              actions.checkboxList,
              actions.undo,
            actions.redo
            ]}
            iconTint="#000000"
            selectedIconTint="#2095F2"
            selectedButtonStyle={{ backgroundColor: "transparent" }}
            insertLink={handleInsertLink}
          />
        <RichTextEditor
              ref={richText}
              useContainer={true}
              style={[NoteScreenStyles.InputBody, { height: bodyHeight }]}
              placeholder="Body"
              initialContentHTML={body}
              onChange={(text) => setBody(text)}
              onHeightChange={(height) => setBodyHeight(height)}
            />
          </View>
          
         <View style={NoteScreenStyles.SaveButton}><Pressable>
            <FontAwesome name="save" size={24} color="black" onPress={handleSaveNote}/></Pressable>
            </View>
            </View>
        </KeyboardAvoidingView>
    )
}