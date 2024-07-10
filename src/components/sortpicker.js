import React from 'react';
import { View, FlatList, Pressable, Modal, Text } from 'react-native';
import { sortNotes } from '../utils/noteutility';
import { SortPickerStyles } from '../styles/styles';
import { FontAwesome } from '@expo/vector-icons';

export const SortPicker = ({ notes, setNotes, visible, setVisible }) => {
  const [selectedValue, setSelectedValue] = React.useState('dateDescending');

  const handleSortChange = (value) => {
    setSelectedValue(value);
    let sortedNotes = [];
    switch (value) {
      case 'dateAscending':
        sortedNotes = sortNotes(notes, 'dateCreated').reverse();
        break;
      case 'dateDescending':
        sortedNotes = sortNotes(notes, 'dateCreated');
        break;
      case 'title':
        sortedNotes = sortNotes(notes, 'title');
        break;
      case 'category':
        sortedNotes = sortNotes(notes, 'category');
        break;
      default:
        sortedNotes = notes;
        break;
    }
    setNotes(sortedNotes);
    setVisible(false);
  };

  const DATA = [
    {
      value: 'dateAscending',
      title: 'Date (Ascending)',
    },
    {
      value: 'dateDescending',
      title: 'Date (Descending)',
    },
    {
      value: 'title',
      title: 'Note Title',
    },
    {
      value: 'category',
      title: 'Note Category',
    },
  ];

  const Item = ({ item }) => (
    <View>
      <Pressable style={SortPickerStyles.ListItem} onPress={() => handleSortChange(item.value)}>
        <Text>{item.title}</Text>
      </Pressable>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View style={SortPickerStyles.ModalContainer}>
        <View>
          <Pressable onPress={() => setVisible(!visible)} style={SortPickerStyles.ModalClose}>
            <FontAwesome name="close" size={24} color="#e34653" />
          </Pressable>
        </View>
        <FlatList
          data={DATA}
          renderItem={Item}
          keyExtractor={item => item.value}
        />
      </View>
    </Modal>
  );
};

export default SortPicker;
