import React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function loginForm ({navigation}) {
    return (
        <View style = {styles.loginForm}>
            <Text style={styles.header}>Login</Text>

            <TextInput style={styles.textinput} placeholder="Your username" />
            <TextInput style={styles.textinput} placeholder="Your password"
            secureTextEntry={true} />

            <TouchableOpacity>
                <Text style={styles.login}>Login</Text>
            </TouchableOpacity>

        </View>
    );
    
}

const styles = StyleSheet.create({
    loginForm: {
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
        color: '#fff',
        borderBottomWidth: 1,
    }, 
    buttontext: {
        fontWeight: 'bold',
        fontSize: 18
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
});

export default loginForm;