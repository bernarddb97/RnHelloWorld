import React, {Component} from 'react';
import {Alert, AppRegistry, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

export default class LoginLeaf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputedNum: '',
        };
        this.updateNum = this.updateNum.bind(this);
        this.textOnLayout = this.textOnLayout.bind(this);
    }

    updateNum(newText) {
        this.setState((state) => {
            return {
                inputedNum: newText,
            };
        }, this.updateNumDone);
    }

    textOnLayout(nativeEvent) {
        this.refs.inputScrollView.scrollToEnd(false);
        console.log('********** this.refs.inputScrollView.scrollToEnd() is called.');
    }

    updateNumDone() {
//        console.log("updateNumDone(), callback of setState() has been called.");
    }

    userPressConfirm() {
        Alert.alert(
            '提示',
            '确定使用' + this.state.inputedNum + '登录吗？',
            [
                {
                    text: '确定', onPress: (() => {
                })
                },
                {
                    text: '取消', onPress: (() => {
                }), style: 'cancel'
                }
            ]
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder={'请输入任意字符'}
                    onChangeText={(newText) => this.updateNum(newText)}/>
                <View ref={'inputView'} style={{height: 160}}>
                    <ScrollView ref={'inputScrollView'} contentContainerStyle={styles.scrollViewStyle}>
                        <Text style={styles.textPromptStyle} onLayout={this.textOnLayout}>
                            {this.state.inputedNum}
                        </Text>
                    </ScrollView>
                </View>
                <Text
                    style={styles.bigTextPrompt}
                    onPress={() => this.userPressConfirm()}>
                    确定
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start'
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
    scrollViewStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    bigTextPrompt: {
        margin: 5,
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
});

AppRegistry.registerComponent('HelloWorld', () => LoginLeaf);