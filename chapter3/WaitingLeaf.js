import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class WaitingLeaf extends Component {

    constructor(props) {
        super(props);
    }

    onGobackPressed() {
        this.props.navigator.pop();
        // this.props.navigator.replace({
        //     name: "login"
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.textPromptStyle}>
                    手机号码： {this.props.phoneNumber}
                </Text>
                <Text
                    style={styles.textPromptStyle}>
                    密码： {this.props.userPW}
                </Text>
                <Text
                    style={styles.textPromptStyle}>
                    默认验证码： {this.props.defaultPin}
                </Text>
                <Text
                    style={styles.bigTextPrompt}
                    onPress={() => this.onGobackPressed()}>
                    返回
                </Text>
            </View>
        );
    }
}

WaitingLeaf.propTypes = {
    phoneNumber: React.PropTypes.string,
    userPW: React.PropTypes.any.isRequired  // 没起作用,Why?
}

WaitingLeaf.defaultProps = {
    defaultPin: '5678'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPromptStyle: {
        fontSize: 20,
    },
    bigTextPrompt: {
        width: 300,
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
});
