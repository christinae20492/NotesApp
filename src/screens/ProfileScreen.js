import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { loadProfile, saveProfile } from '../utils/profileStorage';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Name: John Doe</Text>
      <Text style={styles.label}>Email: john.doe@example.com</Text>
      <TouchableOpacity style={styles.LogoutButton}><SimpleLineIcons name="logout" size={24} color="red" onPress={()=>handleLogout()}/></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  LogoutButton:{
    backgroundColor:'#dedede',
      borderRadius:25,
      padding:13,
      alignContent:'center'
  }
});