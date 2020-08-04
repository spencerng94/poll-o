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

class explorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          category: null,
        }
    }
    
    componentDidMount(){
    }

    
    render(){
        let categoriesData = [{
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
        return(
            <ImageBackground
            source={require('../../dist/background-image.jpg')}
            style={styles.background}
            >
            <View style = {styles.categories}>
                <Text style={styles.header}>Categories</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("FamilyPolls")}>
                    <Text style={styles.newpoll}>Family</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.newpoll}>Healthcare</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.newpoll}>Politics</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.newpoll}>Social</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.newpoll}>Technology</Text>
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

export default explorePage;