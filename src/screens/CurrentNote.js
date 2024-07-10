import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions, Modal, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteNote } from '../utils/noteutility';
import RenderHtml from 'react-native-render-html';
import { CurrentNoteStyles, styles } from '../styles/styles';

export default function CurrentNote({ route, navigation }) {
  const { note } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const { width: contentWidth } = useWindowDimensions();
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: note.title || 'Current Note',
    });
  }, [navigation, note.title]);

  const handleDeleteNote = async (id) => {
    await deleteNote(id, null, navigation);
  };

  if (!note) {
    return (
      <View style={CurrentNoteStyles.container}>
        <Text style={CurrentNoteStyles.errorText}>No note found</Text>
      </View>
    );
  }

  return (
    <View style={CurrentNoteStyles.container}>
      <View style={CurrentNoteStyles.NoteCtn}>
        <ScrollView style={CurrentNoteStyles.ScrollStyle}>
          <RenderHtml
          style={CurrentNoteStyles.body}
            contentWidth={contentWidth}
            source={{ html: note.body }}
          />
        </ScrollView>
      </View>
      <Pressable style={CurrentNoteStyles.DeletingNote}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="red"
          onPress={() => handleDeleteNote(note.id)}
        />
      </Pressable>
      <Pressable style={CurrentNoteStyles.EditingNote}>
        <MaterialCommunityIcons
          name="lead-pencil"
          size={24}
          color="black"
          onPress={() => navigation.navigate('Edit Note', { note })}
        />
      </Pressable>
    </View>
  );
}
