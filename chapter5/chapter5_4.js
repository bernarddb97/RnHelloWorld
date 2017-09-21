import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity, TouchableHighlight} from 'react-native';

export default class HelloWorld extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback backgroud={TouchableNativeFeedback.Ripple('red', false)}>
                    <View style={styles.buttonStyle}>
                        <Text>触摸组件(TouchableNativeFeedback)</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableOpacity>
                    <View style={styles.buttonStyle}>
                        <Text>触摸组件(TouchableOpacity)</Text>
                    </View>
                </TouchableOpacity>
                <TouchableHighlight>
                    <View style={[styles.buttonStyle,{backgroundColor: 'white'}]}>
                        <Text>触摸组件(TouchableHighlight)</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor: 'gray',
        width: 300,
        height: 70
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
