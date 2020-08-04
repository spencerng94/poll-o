import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen'
import signUpForm from './components/signUpForm'
import loginForm from './components/loginForm'
import MyStack from './stacks/MyStack'
// import navigationBar from './components/navigationBar'

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return ( 
      <MyStack />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%'
  },
  logo:{
    width: 200,
    height: 200,
    marginLeft: '28%',
    marginTop: '50%',
  },
  login: {
    backgroundColor: '#3A59FF',
    color: 'white',
    width: "75%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: "2%",
    fontSize:  27,
    marginTop: '10%'
  },
  signup: {
    backgroundColor: 'white',
    color: '#3A59FF',
    width: "65%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '18%',
    padding: "2%",
    fontSize:  33,
    marginTop: '70%'
  }
});
 
export default App;