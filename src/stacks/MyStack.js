import {StackNavigator} from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../components/HomeScreen'
import signUpForm from '../components/signUpForm2'
import loginForm from '../components/loginForm'
import newPoll from '../components/newPoll'
import familyPolls from '../components/familyPolls'
import familyPoll from '../components/familyPoll'
import React from 'react';
import NavigationBoard from '../components/navigationBoard.js'

const Stack = createStackNavigator();

function MyStack () {
    return ( 
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={signUpForm} /> 
            <Stack.Screen name="Login" component={loginForm} />
            <Stack.Screen name="NewPoll" component={newPoll} />
            <Stack.Screen name="NavBar" component={NavigationBoard} />
            <Stack.Screen name="FamilyPolls" component={familyPolls} />
            <Stack.Screen name="FamilyPoll" component={familyPoll} />
          </Stack.Navigator>
        </NavigationContainer>

    );

}

export default MyStack;