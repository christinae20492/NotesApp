import React from 'react';
import { Pressable, View, TextInput } from 'react-native';

export const MainContainer =({children})=>{
    <View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'
    }}>{children}</View>
}

export const LeftButton = ({children})=>{
    <Pressable style={{backgroundColor:'#dedede',
        borderRadius:45,
        padding:13,
        position:'absolute',
        bottom:30,
        left:70}}>{children}</Pressable>
}

export const RightButton = ({children})=>{
    <Pressable style={{backgroundColor:'#dedede',
        borderRadius:45,
        padding:13,
        position:'absolute',
        bottom:30,
        right:70}}>{children}</Pressable>
}

export const CenterButton = ({children})=>{
    <Pressable style={{backgroundColor:'#dedede',
        borderRadius:45,
        padding:13,
        position:'absolute',
        bottom:30}}>{children}</Pressable>
}

export const TitleText = ()=>{
    <TextInput
        style={NoteScreenStyles.InputText}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
}

export const BodyText =()=>{
    <TextInput
        style={NoteScreenStyles.InputText}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline={true}
        numberOfLines={4}
      />
}