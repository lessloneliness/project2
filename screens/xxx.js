import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth } from '../firebase'

export default function Add() {
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);
    setGalleryPermission(imagePermission.status === 'granted');

    if (imagePermission.status !== 'granted') {
     // alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log("here");
    if (!result.cancelled) {
      setImageUri(result.uri);
      console.log("picked photo");
    }
   
  };

  const user = firebase.auth().currentUser;

  if (user) {
   console.log('User email: ', user.email);
  }


  return (
    <SafeAreaView>
    <View >

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.Image}
        />
      ) : (
        <View style={styles.textBox}>
          <Text>No Image Selected</Text>
        </View>
      )}
      <Button title={'Pick From Gallery'} onPress={pick} />
    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
    marginBottom: '7%',
    marginHorizontal: '30%',
    marginVertical:'7%',

  }
  
});