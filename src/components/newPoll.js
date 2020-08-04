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
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import axios from 'axios';
import NavigationBoard from './navigationBoard.js'

class newPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
          category: null,
          question: null,
          option_1: null,
          option_2: null,
          option_3: null, 
          option_4: null,
          option_5: null,
          newPollCreatedDate: moment().format('YYYY/MM/DD HH:mm:ss'),
          numberOfPolls: null,
          numberOfOptions: null,
          userId: null,
        }
        this.getUserId = this.getUserId.bind(this);
        this.getPolls = this.getPolls.bind(this);
        this.getPollOptions = this.getPollOptions.bind(this);
        this.createNewPoll = this.createNewPoll.bind(this);
    }
    
    componentDidMount(){
        this.getPolls();
        this.getUserId();
        this.getPollOptions();
        this.setState({
            category: 6
        });
    }

    getUserId () {
        axios
            .get('http://127.0.0.1:3000/api/users')
            .then((res) => {
                const { data } = res;
                const mostRecentUser = data.length;
                this.setState({ userId: mostRecentUser});
            })
            .catch(err => console.log(err));
      }

    getPolls() {
        axios
            .get('http://127.0.0.1:3000/api/polls')
            .then((res) => {
                const { data } = res;
                const lengthOfPolls = data.length;
                this.setState({ numberOfPolls: (lengthOfPolls === 0) ? 1 : lengthOfPolls + 1});
            })
            .catch(err => console.log(err));
    }

    getPollOptions() {
        axios
            .get('http://127.0.0.1:3000/api/options')
            .then((res) => {
                const { data } = res;
                const lengthOfOptions = data.length;
                this.setState({ numberOfOptions: (lengthOfOptions === 0) ? 1 : lengthOfOptions + 1});
            })
            .catch(err => console.log(err));
    }
    

    createNewPoll() {
    // POST request into 2 tables, (polls, pollOptions)
        // this.getUserId();
        this.getPolls();

        // POST TO POLLS TABLE
        let newPoll = {
            pollId: this.state.numberOfPolls,
            question: this.state.question,
            createdByUserId: this.state.userId,
            categoryId: this.state.category,
            createdOn: this.state.newPollCreatedDate
        }
        console.log(newPoll, 'logging newPoll')

        axios
            .post('http://127.0.0.1:3000/api/poll', newPoll)
            .then(res => {
                // console.log('SUCCESSSSSful poll post DATA', res.data);
                console.log('NUMBER OF POLLS BEFORE ',this.state.numberOfPolls);
                console.log(this.state);
                const { option_1, option_2, option_3, option_4, option_5 } = this.state;
                // console.log('============ TESTING OPTIONSSSSSSSS ==========');
                // console.log(`option1: ${option_1}, option2: ${option_2}, option3: ${option_3}, option4: ${option_4}, option5: ${option_5}`)
                const optionsToAdd = [];
                if(option_1) optionsToAdd.push(option_1)
                if(option_2) optionsToAdd.push(option_2)
                if(option_3) optionsToAdd.push(option_3)
                if(option_4) optionsToAdd.push(option_4)
                if(option_5) optionsToAdd.push(option_5)
                console.log('OPTIONS TO ADD.....', optionsToAdd);
                if(optionsToAdd.length > 0){
                    optionsToAdd.forEach(async (option, index) => {
                        console.log(this.state.numberOfOptions, 'NUMBER OF OPTIONS');
                        let newPollOption = {
                            pollOptionId: this.state.numberOfOptions,
                            text: this.state[`option_${index+1}`],
                            pollId: this.state.numberOfPolls, // Delete later
                            voteCount: 0
                        }
                        this.setState({ numberOfOptions: this.state.numberOfOptions + 1 });
                        console.log('NEW POLL OPTIONS: ', newPollOption);
                        await axios
                            .post('http://127.0.0.1:3000/api/option', newPollOption)
                            .then(res => {
                                console.log(res);
                            })
                            .catch(err => console.log(err));
                    })
                    // this.setState({ numberOfPolls: this.state.numberOfPolls + 1 });
                    // console.log('NUMBER OF POLLS AFTER ',this.state.numberOfPolls);
                }
            })
            .catch(err => console.log(err, 'error from axios.post'));

        Alert.alert('Alert title',
        'Successfully posted new poll!',
        [
            {text: 'OK', onPress: () => this.props.navigation.navigate("NavBar")},
            ],
            { cancelable: true }
        )
    }

    
    render(){
        let dropDownData = [{
            label: 'Family',
            value: 1
          }, {
            label: 'Healthcare',
            value: 2
          }, {
            label: 'Politics',
            value: 3
          }, {
            label: 'Social',
            value: 4
          }, {
            label: 'Technology',
            value: 5
          }];
          let imageUrl={ uri: `https://polls-bucket-mvp.s3-us-west-1.amazonaws.com/photo_${this.state.category}.jpg`};
        //   let imageUrl={ uri: 'https://polls-bucket-mvp.s3-us-west-1.amazonaws.com/photo_1.jpg'};

        return(
            <ImageBackground
            source={require('../../dist/background-image.jpg')}
            style={styles.background}
            >
            <View style = {styles.newPoll}>
                <Text style={styles.header}>New Poll</Text>
                <Dropdown
                    label='Category'
                    style={styles.category} 
                    placeholder="Your category" 
                    placeholderTextColor = "gray"
                    data={dropDownData}
                    onChangeText={
                        (value) => {
                         this.setState({
                            category: value }
                        )}}
                />

            <View style = {styles.imagecontainer}>
                <Image
                    style={styles.image}
                    source={imageUrl}
                />
            </View>
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Your Poll Question" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({question: value})}
                    value={this.state.question} 
                />

                <TextInput 
                    style={styles.textinput} 
                    placeholder="Answer Option 1" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({option_1: value})}
                    value={this.state.option_1} 
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Answer Option 2" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({option_2: value})}
                    value={this.state.option_2} 
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Answer Option 3" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({option_3: value})}
                    value={this.state.option_3} 
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Answer Option 4" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({option_4: value})}
                    value={this.state.option_4} 
                />
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Answer Option 5" 
                    placeholderTextColor = "gray"
                    onChangeText={(value) => this.setState({option_5: value})}
                    value={this.state.option_5} 
                />
                <TouchableOpacity onPress={() => this.createNewPoll()}>
                    <Text style={styles.newpoll}>Create New Poll</Text>
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
    newPoll: {
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
        // marginTop: '20%',
    }
});

export default newPoll;