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


  userRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        const userNameDB = JSON.stringify(doc.data().Name.First); //his name from the data  base
        const bioFromDb = JSON.stringify(doc.data().Bio);
        const friends = JSON.stringify(doc.data().Friends);
        const g = JSON.stringify(doc.data().GroupsId);

        if(friends.length>0) setList(friends);
        setUserName(userNameDB);
        setgroup(g);

        if (bioFromDb.length > 2) setBio(bioFromDb);
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
    saveInDb(); // save The bio change
    auth
      .signOut()
      .then(() => {
        navigation.replace("Less loneless");
      })
      .catch((error) => alert(error.message));
  };

  const saveInDb = () => {
    if (bio.length != 0) {
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
        </View>
        
         <View style={styles.container2}>
          <Image style={styles.Image} source={{ uri: image }}></Image>
          <TouchableOpacity
         onPress={pickImage}
        style={[styles.button, styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Add Photo</Text>
        </TouchableOpacity>
                </View>

       

        <View style={styles.container}>
        <View style={{flexDirection: "row" ,marginLeft: 4,marginBottom:10,marginTop:10, justifyContent: 'space-evenly'}}>
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
              
         
          <Text>Enter bio</Text>
          <TextInput
            style={styles.input}
            placeholder="bio details"
            onChangeText={(val) => setBio(val)}
            multiline={true}

          />
          <Text style={{marginLeft: 4,marginBottom:12,marginTop:0}}>Bio:{bio}</Text>
          <Text>My friends:{list}</Text>
          <Text>My Group:{group}</Text>


          <TouchableOpacity onPress={handleSignOut} style={styles.buttonOutlineText}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
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
    height: 300,
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
   container2: {
   backgroundColor: "white",
   alignItems: "center",
   justifyContent: "center",
  },
  text: {
    fontSize: 23,
    color: "green",
    fontStyle: "italic",
    marginTop: 0,
    marginBottom: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 9,
    width: 300,
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
    color: "red",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 20,
  },
  button2: {
    flexDirection: 'row', 
    height: 50, 
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    elevation:3,
},
  Picker: {
    width: 140,
    height: 45,
    borderColor: "blue",
    borderWidth: 1,
  },
});
