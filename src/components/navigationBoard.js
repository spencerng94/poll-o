import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    View, 
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import signUpForm from './signUpForm'
import newPoll from './newPoll'
import explorePage from './explorePage'

const Tab = createBottomTabNavigator();

function NavigationBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="New Poll" component={newPoll} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={explorePage} />
    </Tab.Navigator>
  );
}

export default NavigationBar;