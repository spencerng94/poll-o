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
import moment from 'moment';
import axios from 'axios';
import NavigationBoard from './navigationBoard.js'

class familyPolls extends Component {
    constructor(props) {
        super(props);
        this.state = {
          familyPolls: [],
        }
        this.getFamilyPolls = this.getFamilyPolls.bind(this);
    }

    getFamilyPolls() {
        axios
            .get('http://127.0.0.1:3000/api/polls')
            .then((res) => {
                const { data } = res;
                const familyPollsArr = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].categoryId === 1) {
                        familyPollsArr.push(data[i])
                    }
                }
                console.log(familyPollsArr, 'logging familyPolls from getFamilyPolls')
                this.setState({ 
                    familyPolls: familyPollsArr,
                });
            })
            .catch(err => console.log(err));
    }
    
    componentDidMount(){
        this.getFamilyPolls();
    }

    
    render(){
        const familyPollsMap = this.state.familyPolls.map((poll) => {
            console.log('POLL...', poll.pollId)
            return (
                <TouchableOpacity key={poll.pollId} onPress={() => this.props.navigation.navigate("FamilyPoll", {question: poll.question, pollId: poll.pollId})}>
                    <Text 
                        key={poll.pollId} 
                        pollId={poll.pollId} 
                        question={poll.question} 
                        style={styles.newpoll}
                            >{poll.question}</Text>
                </TouchableOpacity>
            )
        })
        return(
            <ImageBackground
            source={require('../../dist/background-image.jpg')}
            style={styles.background}
            >
            <View style = {styles.categories}>
                <Text style={styles.header}>Family Polls</Text>

                {/* <TouchableOpacity onPress={() => this.getFamilyPolls()}>
                    <Text style={styles.newpoll}>Family</Text>
                </TouchableOpacity> */}

            <View>{familyPollsMap}</View>
            
                
                

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
    categories: {
        alignSelf: 'stretch',
    },
    category: {
        fontSize: 14,
        color: 'white',
        textAlign:'center'
    },
    header: {
        fontSize: 24,
        color: '#fff',
        // paddingBottom: 10,
        // marginBottom: 40,
        // borderBottomWidth: 1,
        textAlign:'center'
    },
    image: {
        width: 180, 
        height: 180,
        borderRadius: 150 / 2,
        borderWidth: 3,
        overflow: "hidden",
    },
    imagecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 20,
        color: 'white',
        borderBottomWidth: 1,
        textAlign:'center'
    }, 
    buttontext: {
        fontWeight: 'bold',
        fontSize: 18
    },
    newpoll: {
        backgroundColor: 'white',
        color: '#3A59FF',
        width: "65%",
        borderRadius: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: '18%',
        padding: "2%",
        fontSize:  33,
        marginTop: '15%',
    }
});

export default familyPolls;