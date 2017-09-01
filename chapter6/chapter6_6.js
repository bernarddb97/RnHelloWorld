import React, {Component} from 'react';
import {AppRegistry, Dimensions, Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';

let totalHeight = Dimensions.get('window').height;

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);

        this.state = {keyboardShown: false};
        this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;

        this.onDismissKeyboard = this.onDismissKeyboard.bind(this);
    }

    keyboardDidShowHandler() {
        this.setState({keyboardShown: true});
    }

    keyboardDidHideHandler() {
        this.setState({keyboardShown: false});
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler.bind(this));
    }

    componentWillUnmount() {
        if (this.keyboardDidShowListener !== null) {
            this.keyboardDidShowListener.remove();
        }
        if (this.keyboardDidHideListener !== null) {
            this.keyboardDidHideListener.remove();
        }
    }

    onDismissKeyboard() {
        Keyboard.dismiss();
        console.log('Is it get focus: ' + this.refs.bottomInput.isFocused());
    }

    render() {
        return (
            <View style={[styles.container, this.state.keyboardShown && styles.bumpedContainer]}>
                <Text style={styles.buttonStyle} onPress={this.onDismissKeyboard}>
                    Dismiss Keyboard.
                </Text>
                <TextInput style={styles.textInputStyle} ref='bottomInput'
                           onFocus={() => this.setState({keyboardShown: true})}
                           onEndEditing={() => this.setState({keyboardShown: false})}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bumpedContainer: {
        marginTop: -240,
        marginBottom: 240,
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
    buttonStyle: {
        top: 250,
        fontSize: 30,
        backgroundColor: 'grey'
    },
    textInputStyle: {
        position: 'absolute',
        top: totalHeight - 100,
        left: 20,
        width: 200,
        height: 30,
        fontSize: 20,
        backgroundColor: 'grey'
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
