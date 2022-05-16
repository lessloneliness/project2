<<<<<<< HEAD
import { useNavigation } from '@react-navigation/core';
import { React, useState, useEffect } from 'react';
=======
import { useNavigation } from "@react-navigation/core";
import { React, useState, useEffect } from "react";
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
import {
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  View,
  Image,
  Picker,
<<<<<<< HEAD
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db, firestore, auth } from '../firebase';
import DropDownPicker from 'react-native-dropdown-picker';

const GroupScreen = () => {
  const myId = auth.currentUser.uid;
  const myEmail = auth.currentUser.email;
=======
} from "react-native";
import { auth } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { db } from "../firebase";
import "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";

const GroupScreen = () => {
  const userId = auth.currentUser.uid;
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b

  const navigation = useNavigation();
  const [openHobbies, setOpenHobbies] = useState(false);
  const [chosenHobbies, setChosenHobbies] = useState([]);
  const [serverHobbies, setServerHobbies] = useState([]);
  const [openFriends, setOpenFriends] = useState(false);
  const [chosenFriends, setChosenFriends] = useState([]);
  const [serverFriends, setServerFriends] = useState([]);
  const [groupName, setGroupName] = useState(null);
  useEffect(() => {
    const subscriber = db
<<<<<<< HEAD
      .collection('users')
      .doc(myId)
=======
      .collection("users")
      .doc(userId)
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
      .onSnapshot((documentSnapshot) => {
        const userFriends = documentSnapshot
          .data()
          .Friends.map((friend) => ({ label: friend, value: friend }));
        setServerFriends(userFriends);
        const userHobbies = documentSnapshot
          .data()
          .HobbiesId.map(({ item }) => ({ label: item, value: item }));
        setServerHobbies(userHobbies);
      });
<<<<<<< HEAD
    return () => subscriber();
  }, [myId]);
  const createGroup = () => {
    const serverUsers = new Map([[myEmail, myId]]);
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const id = documentSnapshot.id;
          const email = documentSnapshot.data().Email;
          if (id && email && !serverUsers.get(email)) {
            serverUsers.set(email, id);
          }
        });
        [...chosenFriends, myEmail].forEach((value) => {
          const freindId = serverUsers.get(value);
          if (freindId) {
            db.collection('users')
              .doc(freindId)
              .update({
                GroupsId: firestore.FieldValue.arrayUnion(groupName),
              });
          }
        });
      });
    db.collection('group')
      .doc(groupName)
      .set({
        hobbies: chosenHobbies,
        members: [...chosenFriends, myEmail],
        name: groupName,
      })
      .then(() => navigation.replace('Home'));
=======

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
  const createGroup = () => {
    db.collection("group")
      .add({ hobbies: chosenHobbies, members: chosenFriends, name: groupName })
      .then(() => navigation.replace("Home"));
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create Group</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setGroupName}
<<<<<<< HEAD
          placeholder='הקלד שם קבוצה'
=======
          placeholder="הקלד שם קבוצה"
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
        ></TextInput>
        <DropDownPicker
          style={styles.picker}
          zIndex={3000}
          zIndexInverse={1000}
          multiple={true}
<<<<<<< HEAD
          mode='BADGE'
=======
          mode="BADGE"
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
          open={openHobbies}
          value={chosenHobbies}
          items={serverHobbies}
          setOpen={setOpenHobbies}
          setValue={setChosenHobbies}
          setItems={setServerHobbies}
<<<<<<< HEAD
          placeholder='Select Hobbies'
=======
          placeholder="Select Hobbies"
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
        />
        <DropDownPicker
          style={styles.picker}
          zIndex={2000}
          zIndexInverse={2000}
          multiple={true}
<<<<<<< HEAD
          mode='BADGE'
=======
          mode="BADGE"
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
          open={openFriends}
          value={chosenFriends}
          items={serverFriends}
          setOpen={setOpenFriends}
          setValue={setChosenFriends}
          setItems={setServerFriends}
<<<<<<< HEAD
          placeholder='Select Friends'
=======
          placeholder="Select Friends"
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
        />
      </View>
      <TouchableOpacity
        style={{
<<<<<<< HEAD
          textAlign: 'center',
          backgroundColor: 'green',
          width: '35%',
          height: '5%',
=======
          textAlign: "center",
          backgroundColor: "green",
          width: "35%",
          height: "5%",
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
        }}
        onPress={createGroup}
      >
        <Text
<<<<<<< HEAD
          style={{ fontSize: 20, alignSelf: 'center', alignItems: 'center' }}
=======
          style={{ fontSize: 20, alignSelf: "center", alignItems: "center" }}
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
        >
          Create
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
<<<<<<< HEAD
        onPress={() => navigation.replace('Home')}
=======
        onPress={() => navigation.replace("Home")}
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
<<<<<<< HEAD
    backgroundColor: 'white',
    // justifyContent:"center"
    alignItems: 'center',
    justifyContent: 'space-around',
=======
    backgroundColor: "white",
    // justifyContent:"center"
    alignItems: "center",
    justifyContent: "space-around",
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
  },
  headerText: {
    fontSize: 30,
  },
  formContainer: {
<<<<<<< HEAD
    width: '100%',
    height: '60%',
    zIndex: -1000,
    borderWidth: 1,
    alignItems: 'center',
=======
    width: "100%",
    height: "60%",
    zIndex: -1000,
    borderWidth: 1,
    alignItems: "center",
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
    //justifyContent: "space-around",
  },
  picker: {
    marginVertical: 10,
  },
  textInput: {
<<<<<<< HEAD
    width: '75%',
    height: '15%',
=======
    width: "75%",
    height: "15%",
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
    fontSize: 15,
    borderWidth: 1,
  },
  button: {
<<<<<<< HEAD
    backgroundColor: 'red',
    width: '60%',
=======
    backgroundColor: "red",
    width: "60%",
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  button2: {
    backgroundColor: "black",
    width: "40%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  Image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
<<<<<<< HEAD
    borderColor: 'black',
    marginBottom: '1%',
    marginHorizontal: '30%',
    marginVertical: '0%',
=======
    borderColor: "black",
    marginBottom: "1%",
    marginHorizontal: "30%",
    marginVertical: "0%",
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 0,
    padding: 1,
<<<<<<< HEAD
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
    marginHorizontal: '7%',
  },
  textArea: {
    height: 70,
    justifyContent: 'flex-start',
  },
});
=======
    backgroundColor: "rgba(52, 52, 52, 0.1)",
    marginHorizontal: "7%",
  },
  textArea: {
    height: 70,
    justifyContent: "flex-start",
  },
});
>>>>>>> 92cc2b9281bb04ad95793ff211405c1f97978f3b
