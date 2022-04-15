import {React,useState,useEffect} from 'react';
import { Text, View ,TouchableOpacity,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/core'
import firebase from 'firebase/app';
import 'firebase/firestore';


const AddUserScreen = () => {
    const navigation = useNavigation()    // must if we want to use navigation
    const [list, setList] = useState([]);
    const [image, setImage] = useState(null);
    const [img, setImg] = useState([]);

    
    useEffect(() => {
      firebase.firestore().collection('users').get()
       .then((snapshot) => {
         const docList = []
         snapshot.forEach((doc) => {
           docList.push(doc.data());
           img.push(doc.data().id);

         })
         setList(docList);
       })
       .catch((error) => {
         console.log(error)
       })
     }, [])

  
  





    
  return (
    
    <View style={{justifyContent: "center",marginTop:30, alignItems: "center" }}>
      <Text>All the user in the app</Text> 
      <View style={styles.container}>
      {list.map((person) => {
        return (
          <View style={styles.container}>
            <Text style={styles.item}>Email:{person.Email}</Text>
            <Text style={styles.item}>Bio:{person.Bio}</Text>
            <Image style={styles.Image} source=  {require("../assets/logo.jpg")}></Image>

          </View>
        );
      })}
    </View>    
    
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
    padding: 4,
    marginBottom:5

    
  },
  item: {
    padding:2,
    fontSize: 15,
    marginTop: 0,
    marginBottom:5
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
      width: 70,
      height: 70,
      borderRadius: 230 / 2,
      overflow: "hidden",
      marginBottom: '1%',
      marginHorizontal: '1%',
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
  
  