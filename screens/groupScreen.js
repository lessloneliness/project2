import { useNavigation } from '@react-navigation/core'
import {React,useState, useEffect} from 'react'
import { StyleSheet, Text, Button,TouchableOpacity,SafeAreaView,TextInput, View,Image,Picker } from 'react-native'
import { auth } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker'

  const GroupScreen = () => {
  const navigation = useNavigation()
  
  return (
        <View style ={styles.container}>
            <Text style={styles.headerText}>Create Group</Text>
            <View style={styles.formContainer}>
                <TextInput style={styles.textInput}placeholder='הקלד שם קבוצה'></TextInput>
                <DropDownPicker
                    items={[
                        {label: 'English', value: 'en'},
                        {label: 'Deutsch', value: 'de'},
                        {label: 'French', value: 'fr'},
                    ]}
                    defaultIndex={0}
                    containerStyle={{height: 10}}
                    onChangeItem={item => console.log(item.label, item.value)}
                />
                 <DropDownPicker
                dropDownContainerStyle={{ backgroundColor: 'white',zIndex: 1000, height:400}}
                    items={[
                        {label: 'English', value: 'en'},
                        {label: 'Deutsch', value: 'de'},
                        {label: 'French', value: 'fr'},
                    ]}
                    defaultIndex={0}
                    onSelectItem={()=>console.log("selected")}
                    //  open={true}
                    containerStyle={{height: 40}}
                     onChangeItem={item => console.log(item.label, item.value)}
                />
            </View>
            <TouchableOpacity style={{ textAlign:"center",backgroundColor:"green",width:"35%",height:"5%"}}>
                <Text style={{fontSize:20,alignSelf:"center",alignItems:"center"}}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
          onPress={ ()=>navigation.replace("Home")}
          style={[styles.button, styles.buttonOutline]}  >
          <Text style={styles.buttonOutlineText}>Back</Text>
        </TouchableOpacity>
        </View>

  

  );

};

  
  


export default GroupScreen

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
