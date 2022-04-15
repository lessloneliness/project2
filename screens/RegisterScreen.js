import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { SafeAreaView  , StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { isValidElement } from 'react/cjs/react.production.min'
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);


const RegisterScreen = () => {

  var radio_props = [{label: 'male', value: 0 },{label: 'female', value: 1 }]  // array 2 object male or female
  var gen = 0;  // 0 male 1 feamle
  const [email, setEmail] = useState('') // defenion varbile  call email with func setEmail every text change it change the text
  const [password, setPassword] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const navigation = useNavigation()    // must if we want to use navigation
  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])
  const [date, setDate] = useState('09-10-2021');
  const K_OPTIONS = [
    { item: 'walk',  id: '1', },
    { item: 'Run',  id: '2', },
    { item: 'Football',  id: '3', },
    { item: 'Basketball',  id: '4', },
    { item: 'Tennis',  id: '5', },
    { item: 'Swim',  id: '6', },
    { item: 'riding',  id: '7', },
    { item: 'Board Game',  id: '8', },

  ]

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user)  // if he regeister 
      {
        if (user.emailVerified) navigation.replace("Home") }
      })
    return unsubscribe
  }, [])


  const handleSignUp = () => {
    
    auth.createUserWithEmailAndPassword(email, password)
    
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        user.sendEmailVerification();
        firebase.firestore().collection('users').doc(user.uid).set({
          Bio:"",
          Birth:date,
          Id:user.uid,
          Email:email,
          EventsId:[],
          Friends:[],
          Gender:radio_props[gen].label,
          GroupsId:[],
          HobbiesId:selectedTeams,
          Name:{First:first,Last:last},
          Photo:""
        });
        alert('The registration process is almost complete,Confirm the email you received and complete the process');
      
      })
      .catch(error => alert(error.message))
  }



  const Valid = () =>{
   
    if (first.trim() === "") {
      alert("Must write first name")
      return;
   }

   if (last.trim() === "") {
    alert("Must write last name")
    return;

   }
    if (selectedTeams.length==0) {
      alert("Must choose  hobbies")
      return;  
 }
    handleSignUp()

}


  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }




  return (

    
    <SafeAreaView style={styles.contentContainer}>
      <View style={styles.inputContainer}> 
      <Text style={{fontSize:20,marginBottom:15}}>Create Account</Text>
         <TextInput
          placeholder="first name"
          value={first}
          onChangeText={text => setFirst(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="last name"
          value={last}
          onChangeText={text => setLast(text)}
          style={styles.input}
        />
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

         <Text style={{marginTop:20}}>Birth Date :</Text>
         <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-1900"
          maxDate="01-01-2000"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: -5,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              borderColor : "gray",
              alignItems: "flex-start",
              borderWidth: 0,
              borderBottomWidth: 1,
            },
            placeholderText: {
              fontSize: 17,
              color: "gray"
            },
            dateText: {
              fontSize: 17,
            }
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
          <RadioForm style = {{marginTop:30}}
          radio_props={radio_props}
          initial={0}
          animation={true}
          buttonSize={14}
          labelStyle={{fontSize: 13, color: 'black'}}

          onPress={(value) => {gen= value}}
        />

      <SelectBox      
        label="Choose hobbies"
        options={K_OPTIONS}
        horizontal={true}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={Valid}
          style={styles.button} >

        <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={()=>navigation.replace("Less loneless")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Go back</Text>
        </TouchableOpacity>



      </View>




    </SafeAreaView>
     
    


  )
  }

export default RegisterScreen

const styles = StyleSheet.create({

  contentContainer: {
    paddingVertical: 15,
    justifyContent: 'center',
    paddingHorizontal:20,
  },
  inputContainer: {
    width: '80%',

  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 5,
  },
  
  buttonContainer: {
    marginTop: 40,
    flexDirection:"row"
    
  },
  button: {
    backgroundColor: 'white',  // sumbit btn
    padding: 10,
    width:100,
    borderRadius: 50,
    alignItems: 'center',
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutline: {    // go back btn
    backgroundColor: 'white',
    marginLeft: 20,
    borderColor: '#0782F9',
    borderWidth: 2,
    
  },
  buttonText: {  // btns text
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
    
  },
  buttonOutlineText: {  // go back btn
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  

  },
})
