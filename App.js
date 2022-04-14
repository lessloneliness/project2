
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import xxx from './screens/xxx';
import GroupScreen from './screens/groupScreen';
import AddUserScreen from './screens/AddUserScreen';
import CreateEvent from './screens/CreateEvent';



const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:true}}  name="Less loneless" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Register Screen" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="groupScreen" component={GroupScreen} />
        <Stack.Screen name="Add User Screen" component={AddUserScreen} />
        <Stack.Screen name="Create Event Screen" component={CreateEvent} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
