/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput
} from 'react-native';

let widthOfMargin = Dimensions.get('window').width * 0.10;
export default class LoginLeaf extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInputStyle} placeholder={'Input Phone Number:'}/>
        <Text style={styles.textPromptStyle}>
          输入您的手机号码：
        </Text>
        <TextInput style={styles.textInputStyle} placeholder={'Input Password:'}/>
        <Text style={styles.bigTextPrompt}>
          确定
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInputStyle: {
    fontSize: 20,
    backgroundColor: 'gray',
    margin: widthOfMargin,
    textAlign: 'left'
  },
  textPromptStyle: {
    fontSize: 20,
    margin: widthOfMargin,
    textAlign: 'left'
  },
  bigTextPrompt: {
    fontSize: 30,
    backgroundColor: 'gray',
    color : 'white',
    margin: widthOfMargin,
    textAlign: 'center'
  },
});

// AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
