import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";

const itemMargin = 10;
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
  backgroundColor:'#f2f6ff'
    },
    OptionsBar: {
      position:"absolute",
      top:0,
      width:'100%',
      height:'5%',
      border:1,
      borderColor:'#4f4f4f',
      backgroundColor:'white',
      textAlign:'right',
flexDirection:'row',     
 },
    CreateNote: {
      backgroundColor:'#dedede',
      borderRadius:35,
      padding:13,
      position:'absolute',
      bottom:30,
      right:60
    },
    
    noNotesText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
    },
    listContent: {
      padding: itemMargin,
      alignItems:'center'
    },
    noteItem: {
      width: width * 0.25,
      margin: 5,
      padding: 11,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    noteTitle: {
      fontSize: 18,
    },
    noteBody:{
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      width:'90%'
    },
    MultiSelectButton:{
      backgroundColor:'#dedede',
      borderRadius:35,
      padding:13,
      position:'absolute',
      bottom:30,
      left:70
    },
    checkbox: {
      right:0,
      margin:4,
      position:'absolute'
    },
    
  });

export const HomeScreenStyles = StyleSheet.create({
  noteContainer: {
    width: '100%',
    maxHeight:'56%',
    justifyContent: 'center',
padding:20,
  },
  textInput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    width:'30%',
    borderRadius:4,
    backgroundColor:'white',
    marginTop:30,
    textAlign:'center'
  },
  FolderContainer:{
    width:'100%',
    height:150,
    marginTop:10,
    justifyContent:"space-evenly",
  },
  folderitem:{
    textAlign:'center',
    backgroundColor:'#769ce8',
    width:width*0.35,
    borderRadius:5,
    padding:15,
    alignItems:'center',
    borderColor:'black',
    border:2,
    marginHorizontal:5
  }
});

export const CurrentFolderStyles = StyleSheet.create({
  FolderModal:{
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop:height * 0.15
  },
  ModalLeftButton:{
position:'absolute',
left:70,
  },
  ModalRightButton:{
    position:'relative',
    right:70
  },
  FolderNoteContainer:{
    width: '100%',
    minHeight:'56%',
    justifyContent: 'center',
padding:20,
marginTop:'4%'
  },
});

export  const CurrentNoteStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:30,
        justifyContent:'center',
        alignItems:'center'
        },
        NoteCtn:{
            marginTop:10
        },
        body: {
          fontSize: 19,
        },
        DeletingNote:{
          backgroundColor:'#dedede',
            borderRadius:45,
            padding:13,
            position:'absolute',
            bottom:30,
            left:70
        },
        EditingNote:{
          backgroundColor:'#dedede',
            borderRadius:45,
            padding:13,
            position:'absolute',
            bottom:30,
            right:70
        },
        ScrollStyle:{
          maxHeight:'85%'
        },
        DetailsModal:{
          width: width * 0.5,
          height: height * 0.6,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          position:'absolute',
          
          right:0
        },
        DetailsText:{
          fontSize:18,
          color:'#383838',
          padding:15,
          marginTop:15
        },
  })

 export const NoteScreenStyles = StyleSheet.create({
    SaveButton:{
        position:'absolute',
        bottom:100,
        padding:15,
        backgroundColor:'#dedede',
        borderRadius:55,
        alignSelf:'center'
      },
      InputText:{
          padding:10,
          margin:18,
          border:2,
          borderColor:'grey',
          borderRadius:5,
          fontSize:18,
          minHeight:40,
          maxHeight:470
      },
      InputBody:{
        marginLeft:10,
        fontSize:28,
        border:2,
        borderColor:'grey',
        borderRadius:5,
        fontSize:18,
        minHeight:'40%',
        maxHeight:'100%',
        width:'95%'
    },
      Picker:{
        border:'none',
        borderRadius:5,
        backgroundColor:'#e6e6e6',
        width:'90%',
        alignSelf:'center'
      }
  })

export const SortPickerStyles = StyleSheet.create({
  ModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    maxHeight:'40%',
    maxWidth: width * 0.5,
    borderRadius:10,
    border:5,
    borderColor:'grey',
    marginTop:height * 0.11
  },
  ModalClose: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  ListItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
});

export const SettingsStyles = StyleSheet.create({

});