import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text,Button, Image,TextInput, TouchableOpacity, View } from 'react-native'
import { Alert } from 'react-native-web'
import { auth } from '../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  var flag = false;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user === null) return;
      if (user && user.emailVerified) navigation.replace("Home") 
    
    })

    return unsubscribe
  }, [])



  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).then((loggedInUser) =>{
      { 
        if (loggedInUser && loggedInUser.emailVerified) navigation.replace("Home") 
      }
    })
    
      .catch(error => alert(error.message))
  }

 

 const passwordReset = () => {
  return auth.sendPasswordResetEmail(email).catch(error => alert(error.message))
  }
 
  return (
         
 

    <View
    
      style={styles.container}>
        
      <View style={styles.inputContainer}>
      <Image 
      style={{height: 150,width: 200,marginHorizontal:50,marginBottom:50,borderRadius: 300,}} 
      source = {require("../assets/appLogo.png")}/>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          
        />
        
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ ()=>navigation.replace("Register Screen")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={passwordReset} style={{marginTop:30}}>
          <Text style={styles.buttonOutlineText}>Forgot Password?</Text>
        </TouchableOpacity>


     
      </View>
    </View>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   // center horozntl
    alignItems: 'center',  // put all in the center
    marginBottom:30,  // up and down for all screen

  },
  inputContainer: {   // width input email and pass.
    width: '80%',
     
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 20,
    

    
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    
    
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
    
  },

})
