import React from 'react';
import {
    StyleSheet,
    Text, 
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
    return (
        <ImageBackground
        source={require('../../dist/background-image.jpg')}
        style={styles.background}
        >
        <View>
            <Image
                source={require('../../dist/p-logo.png')}
                style={styles.logo}
                resizeMode="contain"
            >
            </Image>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>Log In</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    )
};

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
      marginTop: '20%'
    }
  });

  export default HomeScreen;