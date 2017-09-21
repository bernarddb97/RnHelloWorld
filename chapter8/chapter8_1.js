import React, {Component} from 'react';
import {AppRegistry, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    onScroll(aEvent) {
        console.log(aEvent.nativeEvent);
    }

    onRefresh() {
        console.log("onRefresh() is called.");
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}
                            onScroll={this.onScroll}
                            refreshControl={
                                <RefreshControl refreshing={true}
                                                onRefresh={this.onRefresh}
                                                title='Loading...'
                                                tintColor='#FFFFFF'
                                                colors={['#FF0000', '#00FF00', '#0000FF']}
                                                progressBackgroundColor='#CCCCCC'/>
                            }>
                    <View style={styles.aView}>
                        <ScrollView style={styles.midScrollView}>
                            <View style={styles.bVeiw}/>
                            <View style={styles.cVeiw}/>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        backgroundColor: '#CCCCCC',
    },
    aView: {
        height: 375,
        backgroundColor: '#00FFFF',
    },
    midScrollView: {
        height: 150,
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: '#FFFF00',
    },
    bVeiw: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor: 'blue',
        backgroundColor: '#DD00DD'
    },
    cVeiw: {
        width: 300,
        height: 80,
        borderWidth: 2,
        borderColor: 'blue',
        backgroundColor: '#00DDDD'
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
