import React from 'react';
import {
    StyleSheet,
    Text,
    View, 
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';

const signUpForm = (props, { navigation }) => {
    let userCreatedDate = moment().format('YYYY/MM/DD HH:mm:ss')
    // const createNewUser = props.createNewUser;
    let formData = {
        email: null,
        password: null,
        username: null,
        createdOn: userCreatedDate
    }
    // console.log(createNewUser, 'logging props from signUpForm')


    return (
        <ImageBackground
        source={require('../../dist/background-image.jpg')}
        style={styles.background}
        >
        <View style = {styles.signUpForm}>
            <Text style={styles.header}>Sign Up</Text>

            <TextInput style={styles.textinput} placeholder="Your email" placeholderTextColor = "gray"
            onChangeText={(value) => this.ListeningStateChangedEvent({newEmail: value})}
            value={this.state.newEmail} />
            {/* <TextInput style={styles.textinput} placeholder="Your username" placeholderTextColor = "gray"
            onChange={(event) => formData.username = event.nativeEvent.text}
            value={formData.username}/> */}
            {/* <TextInput style={styles.textinput} placeholder="Your password" placeholderTextColor = "gray"
            secureTextEntry={true} onChange={(event) => formData.password = event.nativeEvent.text}
            value={formData.password}/> */}

            <TouchableOpacity onPress={() => createNewUser(formData)}>
                <Text style={styles.signup}>Sign Up</Text>
            </TouchableOpacity>

        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
      },
    signUpForm: {
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: 'white',
        borderBottomWidth: 1,
    }, 
    buttontext: {
        fontWeight: 'bold',
        fontSize: 18
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

export default signUpForm;