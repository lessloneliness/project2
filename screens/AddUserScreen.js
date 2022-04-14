import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/core'

const AddUserScreen = () => {
    const navigation = useNavigation()    // must if we want to use navigation

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        add user screen! 🎉
      </Text>
      <TouchableOpacity
          onPress={ ()=>navigation.replace("Home")}
          style={[styles.button, styles.buttonOutline]}  >
          <Text style={styles.buttonOutlineText}>Back</Text>
        </TouchableOpacity>
    </View>
  );
}

export default AddUserScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:"white",
      // justifyContent:"center"
      alignItems:'center',
      justifyContent:"space-around"
    },
    headerText: {
      fontSize:30,
    },
    formContainer:{
        width:"100%",
        height:"60%",
        borderWidth: 1,
        alignItems:"center",
        justifyContent:"space-around"
  
    },
    textInput:{
      width:"75%",
      height:"15%",
      fontSize:15,
      borderWidth:1
    },
     button: {
      backgroundColor: 'red',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    button2: {
      backgroundColor: 'black',
      width: '40%',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    Image: {
      width: 150,
      height: 150,
      borderRadius: 150 / 2,
      overflow: "hidden",
      borderWidth: 3,
      borderColor: "black",
      marginBottom: '1%',
      marginHorizontal: '30%',
      marginVertical:'0%',
  
    },
    textAreaContainer: {
      borderColor: 'gray',
      borderWidth: 0,
      padding: 1,
      backgroundColor: 'rgba(52, 52, 52, 0.1)',
      marginHorizontal: '7%',
  
    },
    textArea: {
      height: 70,
      justifyContent: "flex-start"
    }
  })
  
  