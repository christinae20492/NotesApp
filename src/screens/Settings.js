import React from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import { useSettings } from '../components/settings/settingscontext';
import { SettingsStyles } from '../styles/styles';

export default function SettingsScreen ({navigation}) {

    const { settings } = useSettings();

    const DATA = [
        {
          title: 'Display',
          data: ['Color Theme', 'Rich Text Editor', 'Risotto'],
        },
        {
          title: 'Font',
          data: ['Default'],
        },
        {
          title: 'About',
          data: ['Privacy', 'Status', 'Clear Notes'],
        },
      ];

      const renderSettings = ({ item }) => (
        <Pressable
        style={SettingsStyles.SettingsItem}
        onPress={() => handlePress(item)}>
          <Text style={styles.noNotesText}>{item}</Text>
        </Pressable>
      );

      const handlePress = (setting) => {
        navigation.navigate('SettingsDetail', { setting });
      };
    

    return (
        <SafeAreaView style={{flex:1}}>
            <View>
            <SectionList
             sections={DATA}
             keyExtractor={(item, index) => item + index}
             renderItem={({item}) => (
               <View style={{backgroundColor: '#dce8fc',
                padding: 20,
                marginVertical: 8,}}>
                 <Text style={{fontSize: 24,}}>{item}</Text>
               </View>
             )}
             renderSectionHeader={({section: {title}}) => (
               <Text style={{fontSize: 32,
                backgroundColor: '#fff'}}>{title}</Text>
             )}
           />
            </View>
        </SafeAreaView>
    );
}