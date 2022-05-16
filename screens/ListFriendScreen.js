import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import firebase from "firebase/app";
import "firebase/firestore";
import { auth } from "../firebase";

const ListFriendScreen = () => {
  const navigation = useNavigation(); // must if we want to use navigation
  const [list, setList] = useState([]);
  const user = auth.currentUser;
  const userRef = firebase.firestore().collection("users").doc(user.uid); // get the uid.

  userRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setList(doc.data().Friends);

        console.log("user: " + JSON.stringify(doc.data().Name));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

  const RemoveFriend = (IdFriend) => {
    console.log("User 222232: ", auth.currentUser?.email);

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        Friends: firebase.firestore.FieldValue.arrayUnion(null), // add matan to my friend
      });

    firebase
      .firestore()
      .collection("users")
      .doc(IdFriend)
      .set({
        Friends: firebase.firestore.FieldValue.arrayUnion(null), // add cuurent user (hadar) to matan array
      });
  };

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>My friends</Text>
        <View style={styles.container}>
          {list.map((person) => {
            return (
              <View style={styles.container}>
                <Text style={styles.item}>Email:{person}</Text>
                <TouchableOpacity
                  onPress={() => RemoveFriend(person)}
                  style={[styles.button3, styles.buttonOutline]}
                >
                  <Text style={styles.buttonOutlineText}>Remove:</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => navigation.replace("Home")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ListFriendScreen;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginBottom: 5,
  },
  item: {
    padding: 2,
    fontSize: 15,
    marginTop: 0,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 30,
  },
  formContainer: {
    width: "100%",
    height: "60%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInput: {
    width: "75%",
    height: "15%",
    fontSize: 15,
    borderWidth: 1,
  },
  text: {
    fontSize: 23,
    color: "green",
    fontStyle: "italic",
    marginTop: 0,
    marginBottom: 33,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "red",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  button3: {
    backgroundColor: "white",
    width: "80%",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
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
    width: 70,
    height: 70,
    borderRadius: 230 / 2,
    overflow: "hidden",
    marginBottom: "1%",
    marginHorizontal: "1%",
    marginVertical: "0%",
  },
  textAreaContainer: {
    borderColor: "gray",
    borderWidth: 0,
    padding: 1,
    backgroundColor: "rgba(52, 52, 52, 0.1)",
    marginHorizontal: "7%",
  },

  textArea: {
    height: 70,
    justifyContent: "flex-start",
  },
});
