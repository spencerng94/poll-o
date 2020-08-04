import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View, 
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import axios from 'axios';
import {StackNavigator} from 'react-navigation';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          numberOfUsers: null,
          newUserName: null,
          newPassWord: null,
          newEmail: null,
          newUserCreatedDate: moment().format('YYYY/MM/DD HH:mm:ss'),
        }
        this.getUsers = this.getUsers.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
      }
    
      componentDidMount(){
          this.getUsers();
      }

      getUsers () {
        axios
            .get('http://127.0.0.1:3000/api/users')
            .then((res) => {
                const { data } = res;
                const lengthOfUsers = data.length;
                this.setState({ numberOfUsers: (lengthOfUsers === 0) ? 1 : lengthOfUsers + 1});
            })
            .catch(err => console.log(err));
      }
    
      createNewUser() {
          console.log('inside createNewUser');
        // let numberOfUsers = this.getUsers();
        // console.log(numberOfUsers);
        
        let userFormData = {
          userId: this.state.numberOfUsers,
          email: this.state.newEmail,
          password: this.state.newPassWord,
          username: this.state.newUserName,
          createdOn: this.state.newUserCreatedDate
        }
    
        console.log(userFormData, 'logging userFormData')
        axios
            .post('http://127.0.0.1:3000/api/signup', userFormData)
            .then(res => {
                console.log('SUCCESSSSS ', res);
            })
            .catch(err => console.log(err, 'error from axios.post'));

        Alert.alert('Sign Up Status',
        'Successfully signed up!',
        [
            {text: 'OK', onPress: () => this.props.navigation.navigate("NavBar")},
          ],
          { cancelable: false }
        )
      }
    
    render(){
        console.log('numofusers', this.state.numberOfUsers);
        return(
            <ImageBackground
            source={require('../../dist/background-image.jpg')}
            style={styles.background}
            >
            <View style = {styles.signUpForm}>
                <Text style={styles.header}>Sign Up</Text>

                <TextInput 
                    style={styles.textinput} 
                    placeholder="Your email" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({newEmail: value})}
                    value={this.state.newEmail} 
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Username" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({newUserName: value})}
                    value={this.state.newUserName} 
                />
                <TextInput
                    style={styles.textinput} 
                    placeholder="Password" 
                    placeholderTextColor = "gray"
                    secureTextEntry={true}
                    onChangeText={(value) => this.setState({newPassWord: value})}
                    value={this.state.newPassWord} 
                />
                {/* <TextInput style={styles.textinput} placeholder="Your username" placeholderTextColor = "gray"
                onChange={(event) => formData.username = event.nativeEvent.text}
                value={formData.username}/>
                <TextInput style={styles.textinput} placeholder="Your password" placeholderTextColor = "gray"
                secureTextEntry={true} onChange={(event) => formData.password = event.nativeEvent.text}
                value={formData.password}/> */}

                <TouchableOpacity onPress={() => this.createNewUser()}>
                    <Text style={styles.signup}>Sign Up</Text>
                </TouchableOpacity>

            </View>
            </ImageBackground>
        )
    }
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

export default SignUpForm;