import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';

export default class HelloWorld extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.firstRow}>
                    <View style={styles.test1} />
                    <View style={styles.test2} />
                    <View style={styles.test3} />
                    <View style={styles.test1} />
                    <View style={styles.test2} />
                    <View style={styles.test3} />
                    <View style={{width: 40, height: 40, backgroundColor: 'green', display: 'none'}} />
                    <View style={[styles.test2, {backgroundColor: 'cyan'}]} />
                    <Text style={styles.textStyle}>
                        ABCDE
                    </Text>
                </View>
                <View style={styles.testPosition} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    firstRow: {
        height: 160,
        top: 20,
        backgroundColor: 'black',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    test1: {
        width: 68,
        height: 24,
        backgroundColor: 'red',
    },
    test2: {
        width: 40,
        height: 48,
        backgroundColor: 'yellow',
    },
    test3: {
        width: 100,
        height: 72,
        backgroundColor: 'blue',
    },
    textStyle: {
        color: 'white',
        backgroundColor: 'grey',
        fontSize: 18,
    },
    testPosition: {
        width: 60,
        height: 60,
        backgroundColor: 'grey',
        position: 'absolute',
        top: 150,
        right: 100
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
