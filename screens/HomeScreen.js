import { useNavigation } from "@react-navigation/core";
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

  userRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        const userNameDB = JSON.stringify(doc.data().Name.First); //his name from the data  base
        const bioFromDb = JSON.stringify(doc.data().Bio);
        setUserName(userNameDB);
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
          <Button title={"Add Photo"} onPress={pickImage}></Button>
        </View>

        <View style={styles.container}>

       
         
          <Text>Enter bio</Text>
          <TextInput
            style={styles.input}
            placeholder="bio details"
            onChangeText={(val) => setBio(val)}
            multiline={true}

          />
          <Text>Bio:{bio}</Text>

          <Button 
            title={"Add friend"}
            onPress={() => navigation.replace("Add Friend Screen")}
            
          > </Button>
          <Button
            title={"Create Group"}
            onPress={() => navigation.replace("groupScreen")}
          ></Button>
          <Button
            title={"Create Event"}
            onPress={() => navigation.replace("Create Event Screen")}
          ></Button>


          <Picker
            style={styles.Picker}
            selcetedValue={pickerValue}
            onValueCahnges={(itemValue) => setPickerValue(itemValue)}
          >
            <Picker.Item label="My friends" value="My friends" />
          </Picker>
          <Picker
            style={styles.Picker}
            selcetedValue={pickerValue}
            onValueCahnges={(itemValue) => setPickerValue(itemValue)}
          >
            <Picker.Item label="My Group" value="My Group" />
            <Picker.Item label="My Group" value="My Group" />

          </Picker>
          <Picker
            style={styles.Picker}
            selcetedValue={pickerValue}
            onValueCahnges={(itemValue) => setPickerValue(itemValue)}
          >
            <Picker.Item label="My Events" value="My Events" />
          </Picker>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
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
    height: 500,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
