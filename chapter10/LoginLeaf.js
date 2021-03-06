import React, {Component} from 'react';
import {Alert, Dimensions, StyleSheet, Text, TextInput, View, DeviceEventEmitter} from 'react-native';

let widthOfMargin = Dimensions.get('window').width * 0.10;

export default class LoginLeaf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputedNum: '',
            inputedPW: ''
        };
        this.updatePW = this.updatePW.bind(this);
        this.jumpToWaiting = this.jumpToWaiting.bind(this);
    }

    updateNum(newText) {
        this.setState((state) => {
            return {
                inputedNum: newText,
            };
        }, this.updateNumDone);
    }

    updateNumDone() {
        console.log("updateNumDone(), callback of setState() has been called.");
    }

    updatePW(newText) {
        this.setState((state) => {
            return {
                inputedPW: newText,
            };
        });
    }

    userPressConfirm() {
        this.props.userPressLogin(this.state.inputedNum, this.state.inputedPW);
    }

    jumpToWaiting() {
        this.props.navigator.push({
            // this.props.navigator.replace({
            name: 'waiting',
            phoneNumber: this.state.inputedNum,
            userPW: this.state.inputedPW,
        });
    }

    userPressAddressBook() {
        DeviceEventEmitter.addListener('AndroidToRNMessage', this.handlerAndroidMessage.bind(this));

        var {NativeModules} = require('react-native');
        NativeModules.ExampleInterface.handleMessage('Android Native Message');
    }

    handlerAndroidMessage(aMessage) {
        console.log("Message from Android Native Code: " + aMessage);
        let msgObj = JSON.parse(aMessage);
        this.setState({inputedNum: msgObj.peerNumber});
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder={'请输入手机号码'}
                    onChangeText={(newText) => this.updateNum(newText)}/>
                <Text
                    style={styles.textPromptStyle}>
                    您输入的手机号码： {this.state.inputedNum}
                </Text>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder={'请输入密码'}
                    password={true}
                    onChangeText={this.updatePW}/>
                <Text
                    style={styles.bigTextPrompt}
                    onPress={() => this.userPressConfirm()}>
                    确定
                </Text>
                <Text
                    style={styles.bigTextPrompt}
                    onPress={() => this.userPressAddressBook()}>
                    通讯录
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textInputStyle: {
        margin: widthOfMargin,
        backgroundColor: 'gray',
        fontSize: 20,
    },
    textPromptStyle: {
        margin: widthOfMargin,
        fontSize: 20,
    },
    bigTextPrompt: {
        margin: widthOfMargin,
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
});
