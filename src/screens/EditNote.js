import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { editNote } from '../utils/noteutility';
import { FontAwesome } from '@expo/vector-icons';
import { NoteScreenStyles } from '../styles/styles';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';

export default function EditNote({ route, navigation }) {
  const { note } = route.params;
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');
  const [bodyHeight, setBodyHeight] = useState(40);
  const richText = useRef();

  useEffect(() => {
    navigation.setOptions({
      title: 'Edit Note',
    });
  }, [navigation]);

  const handleEditNote = async () => {
    const bodyContent = await richText.current.getContentHtml();
    await editNote(note.id, title, bodyContent, navigation);
  };

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
        <TextInput
          style={NoteScreenStyles.InputText}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
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
        <RichEditor
          ref={richText}
          style={[NoteScreenStyles.InputBody, { height: bodyHeight }]}
          placeholder="Body"
          initialContentHTML={body}
          onChange={setBody}
          onHeightChange={setBodyHeight}
        />
      </View>
      <View>
        <Pressable style={NoteScreenStyles.SaveButton} onPress={handleEditNote}>
          <FontAwesome name="save" size={24} color="black" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
