import React, {Component} from 'react';
import {Alert, Dimensions, StyleSheet, Text, TextInput, View, DeviceEventEmitter} from 'react-native';

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
//        console.log("updateNumDone(), callback of setState() has been called.");
    }

    updatePW(newText) {
        this.setState((state) => {
            return {
                inputedPW: newText,
            };
        });
    }

    userPressConfirm() {
        Alert.alert(
            '提示',
            '确定使用' + this.state.inputedNum + '登录吗？',
            [
                {text: '确定', onPress: this.jumpToWaiting},
                {text: '取消', onPress: (() => {}), style: 'cancel'}
            ]
        )
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
        // Message Mechanism
        DeviceEventEmitter.addListener('AndroidToRNMessage', this.handlerAndroidMessage.bind(this));

        var {NativeModules} = require('react-native');

//        // Callback Mechanism
//        NativeModules.ExampleInterface.handleMessageCallback('Android Native Message', this.callbackByNativeMethod);

        // Promise Mechanism
        NativeModules.ExampleInterface.handleMessagePromise('Android Native Message').then(
            (result) => {
                console.log('********** Promise Result from Android Native ' + result);
            }
        ).catch(
            (error) => {
                console.log('********** Promise Error from Android Native ' + error.message + error.code);
            }
        );
    }

    // Message Mechanism
    handlerAndroidMessage(aMessage) {
        console.log("Message from Android Native Code: " + aMessage);
        let msgObj = JSON.parse(aMessage);
        this.setState({inputedNum: msgObj.peerNumber});
    }

    callbackByNativeMethod(anyStr) {
        console.log("********** callbackByNativeMethod() is called. Param: " + anyStr);
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
        margin: 5,
        backgroundColor: 'gray',
        fontSize: 20,
    },
    textPromptStyle: {
        margin: 5,
        fontSize: 20,
    },
    bigTextPrompt: {
        margin: 5,
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
});
