import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.firstView}>
                </View>
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
