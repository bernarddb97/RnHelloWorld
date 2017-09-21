import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import KenBurnsView from './KenBurnsView';

export default class NaviModule extends Component {

    render() {
        return (
            <View style={styles.container}>
                <KenBurnsView imgSource={'DaLian.jpg'} style={{'width':360, 'height': 240}}/>
                <KenBurnsView imgSource={'SampleView.jpg'} style={{'width':360, 'height': 240}}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('HelloWorld', () => NaviModule);
