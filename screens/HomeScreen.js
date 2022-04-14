import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text,TouchableOpacity,View,Image, TextInput, SafeAreaView} from "react-native";
import { Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase/app';
import "firebase/firestore";
import storage from 'firebase/storage'; // 1


const HomeScreen = () => {
  

  const ref = firebase.storage().ref('/'+'C553278A-B4D5-4ADA-81E4-DCE58B938A01.jpg');
  const z =  ref.getDownloadURL().then((url) => {
    setImage(url);
  });

  const navigation = useNavigation();
  const [myText, setMyText] = useState("Hello");
  const [bio, setBio] = useState("details");
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [photourlDb, setPhotourlDb] = useState("");

  const user = firebase.auth().currentUser;



  const handleSignOut = () => {  // when the user click on sign out , fire base save it.
    auth.signOut().then(() => {navigation.replace("Less loneless");})
      .catch((error) => alert(error.message));
};


  if (user) console.log("User email: "+ user.email); // check if work
   var userRef = firebase.firestore().collection('users').doc(user.uid); // get the uid.
   

    userRef.get().then(function(doc) {
        if (doc.exists) {
          var t =JSON.stringify(doc.data().Name.First);
          setUserName (t);
          setPhotourlDb(JSON.stringify(doc.data().Photo))
          console.log('user: ' + JSON.stringify(doc.data().Name));
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });




  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMyText("Hello" +userName);
      setImage(result.uri);
    }

    const reference = firebase.storage().ref('black-t-shirt-sm.png');

    

    const filename = image.substring(image.lastIndexOf('/') + 1);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(filename);
      
    const task = ref.put(blob, { contentType: 'image/jpeg' });

    task.on('state_changed', 
      (snapshot) => {
        console.log(snapshot.totalBytes)
      }, 
      (err) => {
        console.log(err)
      }, 
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setPhotourlDb(downloadURL);

      });
    })

    
     firebase.firestore().collection('users').doc(user.uid).update({
      Bio:bio,
      Photo:photourlDb
    }).catch(error => console.log(error.message))
    ;

    
  };






  return (
    <SafeAreaView>
      <View style={styles.emailView}>
        <Text> {myText}</Text>
        <Text>{auth.currentUser?.email}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.body}></View>
        <Text style={styles.text}>Less Loneliness</Text>
        <Text
          style={{
            color: "red",
            fontSize: 20,
            textAlign: "center",
            margin: 0,
            fontStyle: "italic",
            marginBottom:1,
            marginTop:3
          }}
        >
          Create Profile
        </Text>
        <Button title={"Add Photo"} onPress={pickImage}></Button>
        <Image style={styles.Image} source={{ uri: image }}></Image>
        <View style={{ alignItems: "center" }}></View>
        <Text>Enter bio</Text>
        <TextInput
          style={styles.input}
          placeholder="bio details"
          onChangeText={(val) => setBio(val)}
        />
        <Text>Bio:{bio}</Text>
        <Button 
          title={"Add User"}
          onPress={()=>navigation.replace("Add User Screen")}   
        ></Button>
        <Button
          title={"Create Group"}
          onPress={()=>navigation.replace("groupScreen")}   
           
        ></Button>
        <Button
          title={"Create Event"}
          onPress={()=>navigation.replace("Create Event Screen")}   
        ></Button>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container}></View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 530,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "green",
    fontStyle: "italic",
    marginTop:0,
    marginBottom:10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
  emailView: {
    alignItems: "center",
    marginVertical: "5%",
  },
  Image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    marginBottom: "1%",
    marginHorizontal: "30%",
    marginVertical: "0%",
  },
  buttonText: {
    color: "red",
    fontWeight: "700",
    fontSize: 16,
    marginTop:30
   },
});
