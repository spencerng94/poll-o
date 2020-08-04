import React, { Component} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View, 
    Image,
    Modal,
    ImageBackground,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import axios from 'axios';
import {StackNavigator} from 'react-navigation';


class familyPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pollId: null,
          question: null,
          optionsText: [],
          newPassWord: null,
          newEmail: null,
          newUserCreatedDate: moment().format('YYYY/MM/DD HH:mm:ss'),
          options: [],
          votesTotal: null,
          votePercents: [],
          modalVisible: false
        }
      }
    
    componentDidMount(){
        console.log(this.props.route.params.question, 'COMPONENTDIDMOUNT');
        this.setState({
            pollId: this.props.route.params.pollId,
            question: this.props.route.params.question
        })
        // console.log(this.props, 'line 33')
        this.getPollOptions(this.props.route.params.pollId)
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    getPollOptions(id) {
        console.log('POLL ID IS.. ', id);
        axios
            .get(`http://127.0.0.1:3000/api/options/${id}`)
            .then((res) => {
                const { data } = res;
                const lengthOfOptions = data.length;
                this.setState({ options: data });
                // console.log('DATA..', data);
                // this.setState({ numberOfOptions: (lengthOfOptions === 0) ? 1 : lengthOfOptions + 1});
            })
            .catch(err => console.log(err));
    }

    getTotalVotes() {
        // this.getPollOptions(this.state.pollId);
        let totalVotes = 0;
        // console.log(totalVotes, 'logging totalVotes')
        // console.log(this.state.options, 'logging this.state.options')
        for (var i = 0; i < this.state.options.length; i++) {
            let optionVotes = this.state.options[i].voteCount; 
            // console.log(optionVotes, i, 'logging optionVotes')
            totalVotes += optionVotes
        }
        // console.log(totalVotes, 'logging totalVotes')
        this.setState({ votesTotal: totalVotes })
    }

    getVotePercentages() {
        () => this.getTotalVotes();
        let votesArr = [];
        let totalVotes = 0;
        let votePercentages = [];
        let optionsArr = [];
        for (var i = 0; i < this.state.options.length; i++) {
            let questions = this.state.options[i].text;
            let optionVotes = this.state.options[i].voteCount; 
            votesArr.push(optionVotes);
            optionsArr.push(questions);
            totalVotes += optionVotes
        }
        // console.log(totalVotes, 'logging totalVotes from getVotePercentages')
        // console.log(votesArr, 'logging votePercents')
        votesArr.forEach(element => votePercentages.push(Math.round((element / totalVotes) * 100 + Number.EPSILON) / 100 ))
        console.log(votePercentages, 'logging votePercentages');
        console.log(optionsArr, 'logging 95')
        this.setState({
            votePercents: votePercentages,
            optionsText: optionsArr
        })
    }


    vote(option){
        const { pollId, pollOptionId, text, voteCount } = option;
        // increment Option by 1
        let incrementVote = voteCount + 1;
        // axios.patch()
        let patchData = {
            pollOptionId: pollOptionId,
            voteCount: incrementVote
        }
        // console.log(patchData, 'logging patchData')

        axios
            .patch(`http://127.0.0.1:3000/api/options/${pollOptionId}`, patchData)
            .then(res => {
                console.log('successfully updated voteCount!')
            }).catch(error => 
                console.log(error, 'logging error from axios.patch')
            )
        
        this.setModalVisible(true);
      

    }

    getFamilyPoll() {
        axios
            .get('http://127.0.0.1:3000/api/polls')
            .then((res) => {
                const { data } = res;
                const familyPollsArr = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].categoryId === 1) {
                        familyPollsArr.push(data[i].question)
                    }
                }
                console.log(familyPollsArr, 'logging familyPolls from getFamilyPolls')
                this.setState({ familyPolls: familyPollsArr });
            })
            .catch(err => console.log(err));
    }

    
    render(){
        const { modalVisible } = this.state;
        const votePercentagesModal = this.state.votePercents;

        const modalOptionsMap = this.state.optionsText.map((option, index) => {
            return (
                <Text style={styles.modalText}>
                    {option}
                    {"\n"}
                </Text>
            )
        })

        const modalPercentsMap = this.state.votePercents.map((percent, index) => {
            return (
                <Text style={styles.modalText}>
                    {percent}
                    {"\n"}
                </Text>
            )
        })

        let imageUrl={ uri: `https://polls-bucket-mvp.s3-us-west-1.amazonaws.com/photo_1.jpg`};
        //
        const optionsModal = <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
<Text>

        {modalOptionsMap}   Votes by Percentage 
</Text>
        <Text>
        {modalPercentsMap}

        </Text>


        

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close Votes</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
        
        // console.log('THIS.PROPS.... ', this.props);
        const optionsList = this.state.options.map((option, index) => {
            // console.log('OPTION TEST IN MAP ', option)
            return (
                <TouchableOpacity key={index} onPress={() => this.vote(option)}>
                    <Text style={styles.newpoll}>
                        {option.text}
                         {/* {(option.voteCount === 0) ? '' : <Text style={styles.right}>B</Text>} */}
                    </Text>
                </TouchableOpacity>
            )
        })
        return(
            <ImageBackground
            source={require('../../dist/background-image.jpg')}
            style={styles.background}
            >
            <View>
 

                <View style = {styles.familyPoll}>
                    <Text style={styles.header}>Family</Text>

                    <View style = {styles.imagecontainer}>
                        <Image
                            style={styles.image}
                            source={imageUrl}
                        />
                    </View>

<View>
    {optionsModal}
</View>


                    <View style = {styles.familyPoll}>
                        <Text style={styles.header}>{this.state.question}</Text>
                    </View>
                    <View>{optionsList}</View>
<View>

                    <TouchableOpacity  onPress={() => this.getVotePercentages()}>
                        <Text style={styles.newpoll}>
                            getTotalVotes
                        </Text>
                    </TouchableOpacity>
</View>

                </View>

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
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    familyPoll: {
        alignSelf: 'stretch',
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      modalView: {
        flexDirection: 'row',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomWidth: 1,
        textAlign:'center'
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
        marginTop: '5%',
    },
    right: {
        textAlign: 'right'
    }
});

export default familyPoll;