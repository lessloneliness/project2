import { useNavigation ,FlatList} from "@react-navigation/core";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/app";
import "firebase/firestore";
import storage from "firebase/storage"; // 1
import { Picker } from "@react-native-picker/picker";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [myText, setMyText] = useState("Hello");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const user = firebase.auth().currentUser; // from auth fire base
  const userRef = firebase.firestore().collection("users").doc(user.uid); // get the uid.
  const [pickerValue, setPickerValue] = useState("test"); //set picker
  const [list, setList] = useState([]);
  const [group, setgroup] = useState([]);
  const [scrollDown, setScrollDown] = useState(false)
  const [bioFromDb, setbioFromDb] = useState("")


  userRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        const userNameDB = JSON.stringify(doc.data().Name.First); //his name from the data  base
        setbioFromDb(JSON.stringify(doc.data().Bio));
        const friends = JSON.stringify(doc.data().Friends);
        const g = JSON.stringify(doc.data().GroupsId);
        

        if(friends.length>0) setList(friends);
        setUserName(userNameDB);
        setgroup(g);

          
        const ref = firebase.storage().ref("/" + user.uid + ".jpg"); // get the url from fire base stotage
        ref
          .getDownloadURL()
          .then((url) => {
            if (url != null) setImage(url);
          })
          .catch((e) => {
            console.log(e);
          });

        console.log("user: " + JSON.stringify(doc.data().Name));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
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
      setMyText("Hello" + userName);
      setImage(result.uri);
    }


    //const filename = image.substring(image.lastIndexOf('/') + 1);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(user.uid + ".jpg");

    const task = ref.put(blob, { contentType: "image/jpeg" });

    task.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.totalBytes);
      },
      (err) => {
        console.log(err);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
        });
      }
    );
  };

  const handleSignOut = () => {
    // when the user click on sign out , fire base save it.
     // save The bio change
    auth
      .signOut()
      .then(() => {
        navigation.replace("Less loneless");
      })
      .catch((error) => alert(error.message));
  };

  const saveInDb = () => {
    setScrollDown(false)
    alert("The changes you made were saved")

    if (bio.length != 0 ) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          Bio: bio,
        })
        .catch((error) => console.log(error.message));
    }
  };

  const BioEdit = () => {
  
    setScrollDown(true)
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.emailView}>
        <Text style={styles.text}>Less Loneliness</Text>
        <Text
            style={{
              color: "red",
              fontSize: 15,
              textAlign: "center",
              margin: 0,
              fontStyle: "italic",
              marginBottom: 1,
              marginTop: 2,
            }}
          >
            Create Profile
          </Text>
          <Text> {myText}</Text>
          <Text>{auth.currentUser?.email}</Text>
          <TouchableOpacity
         onPress={pickImage}
        style={[ styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText5}>Add Photo</Text>
        </TouchableOpacity>
        </View>
        
        
         <View style={styles.container2}>
          <Image style={styles.Image} source={{ uri: image }}></Image>        
         </View>

       

        <View style={styles.container}>
        <View style={{flexDirection: "row" ,marginLeft: 0,marginBottom:0,marginTop:10, justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          onPress={() => navigation.replace("Add Friend Screen")}
        style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Add friend</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("groupScreen")}
          style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Create Group</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("Create Event Screen")}
          style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Create Event</Text>
        </TouchableOpacity>
        
        </View>
     
        <Text ></Text>
        <Text >Write about your self</Text>
          
          <TextInput 
            style={styles.input}
            placeholder={"bio"}
            onChangeText={(val) => setBio(val)}
            multiline={true}
            editable={scrollDown}
          

          />
          <View style={{flexDirection: "row" ,marginLeft: 0,marginBottom:0,marginTop:0, justifyContent: 'space-evenly'}}>

             <TouchableOpacity
          onPress={BioEdit}
          style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Edit Bio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveInDb}
          style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Save Bio</Text>
        </TouchableOpacity>
        
        </View>
           <Text></Text>
           <Text style={styles.buttonOutline2}>{bioFromDb} </Text>
           <View style={styles.emailView}>
           <Text></Text>
          < Text></Text>
          <Text style={styles.buttonOutline2}>My friends:{list}</Text>
          <Text  style={styles.buttonOutline2}>My Group:{group}</Text>

          <TouchableOpacity onPress={handleSignOut} style={[styles.button2, styles.buttonText]}>
            <Text>Sign out</Text>
          </TouchableOpacity>
        
          </View>

          <StatusBar style="auto" />
        </View>
        <View style={styles.container}></View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: 400,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: 'blue',
    width: '24%',
    padding: 2,
    borderRadius: 7,
    alignItems: 'center',
    marginLeft:10,
    
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutline2: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 0,
    width: 200,

  },
   buttonOutline2: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 0,
    width: 200,

  },
  
   container2: {
   backgroundColor: "white",
   alignItems: "center",
   justifyContent: "center",
   marginBottom:0,
  },
  text: {
    fontSize: 23,
    color: "green",
    fontStyle: "italic",
    marginTop: 0,
    marginBottom: 1,
  },
  input: {
    backgroundColor: 'silver',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 25,
    marginBottom: 5,
    marginTop:10,
    width: 200,
    height:100,
  },
  emailView: {
    alignItems: "center",
    marginVertical: "1%",
    marginBottom:10,
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    marginBottom: "1%",
    marginHorizontal: "30%",
    marginVertical: "0%",
  },
  buttonText: {
    color: "green",
    fontSize: 2,
    marginTop: 20,
    backgroundColor:"red"
  },
  button2: {
    backgroundColor: 'white',  // sumbit btn
    padding: 10,
    width:100,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 1,
},

  Picker: {
    width: 140,
    height: 45,
    borderColor: "blue",
    borderWidth: 1,
  },
});
