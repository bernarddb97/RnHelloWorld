import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, StyleSheet, View} from 'react-native';

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);
        this.state = {
            savedItem: "00000",
            savedItem1: "11111",
            savedItem2: "22222"
        };
    }

    componentWillMount() {
        // try {
        //     AsyncStorage.setItem('key1', 12345);
        // } catch (e) {
        //     console.log("AsyncStorage.setItem() Error: try{}catch(){}");
        // }

        AsyncStorage.setItem('key1', 67890).then(
            () => this.setState({savedItem: '67890'})
        ).catch(
            (error) => {
                console.log("AsyncStorage.setItem() Error: Promise.")
                console.log("Error Message: " + error.message);
            }
        )

        // try {
        //     AsyncStorage.multiSet([['key1', 12345], ['key2', '67890']]);
        // } catch (e) {
        //     console.log("AsyncStorage.multiSet() Error: try{}catch(){}");
        // }

        AsyncStorage.multiSet([['key1', 12345], ['key2', '67890']]).then(
            () => this.setState({
                savedItem1: '12345',
                savedItem2: '67890'
            })
        ).catch(
            (error) => {
                console.log("AsyncStorage.setItem() multiSet: Promise.")
                console.log("Error Message Length: " + error.length);
                console.log("Error Message: " + error[0].message);
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    firstView: {
        height: 160,
        top: 20,
        backgroundColor: 'black',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
