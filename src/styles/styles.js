import { StyleSheet, Dimensions } from "react-native";

const itemMargin = 10;
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    HeaderText: {
      fontSize: 26,
      textAlign: 'center',
    },
    CreateNote: {
      backgroundColor:'#dedede',
      borderRadius:25,
      padding:13,
      position:'absolute',
      bottom:30,
      right:60
    },
    noteContainer: {
      width: '100%',
      justifyContent: 'center',
  padding:20,
  position:'relative',
  top:10
    },
    noNotesText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
    },
    listContent: {
      padding: itemMargin,
      alignItems:'flex-start'
    },
    noteItem: {
      width: 140,
      margin: 5,
      padding: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    noteTitle: {
      fontSize: 16,
    },
    refreshButtonContainer:{
      backgroundColor:'#dedede',
      borderRadius:25,
      padding:13,
      position:'absolute',
      bottom:30,
      left:70
    }
  });

export  const CurrentNoteStyles = StyleSheet.create({
    container:{
        flex:1,
        padding:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:-480
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        },
        body: {
          fontSize: 16,
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
        }
  })

 export const EditNoteStyles = StyleSheet.create({
    container: {
        flex:1,
    padding:30,
    alignItems:'center',
    marginTop:10
      },
      SavedNote:{
        backgroundColor:'#dedede',
          borderRadius:65,
          padding:13,
          position:'absolute',
          top:555,
          left:-20
      },
      InputText:{
        padding:10,
        width:300,
        marginTop:5,
        marginBottom:10,
    }
  })

 export const NoteScreenStyles = StyleSheet.create({
    SaveButton:{
        position:'absolute',
        alignSelf:'center',
        padding:15,
        backgroundColor:'#dedede',
        borderRadius:45,
        top:50
      },
      InputText:{
          padding:10,
          margin:18,
          border:2,
          borderColor:'grey',
          borderRadius:5,
          fontSize:18,
      }
  })