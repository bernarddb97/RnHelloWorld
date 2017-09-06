import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

let madagascar_04 = require('../image/madagascar_04.png');
let madagascar_08 = require('../image/madagascar_08.png');

export default class ImageDisplayer extends Component {

    constructor(props) {
        super(props);
    }

    changeScene() {
        this.props.callback();
        this.props.navigator.push({
            UIIndex: this.props.UIIndex + 1,
            leftCallback: this.props.leftCallback,
            rightCallback: this.props.rightCallback
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.changeScene.bind(this)}>
                    {
                        (this.props.UIIndex % 2 === 0) ?
                            (
                                <Image source={madagascar_04} style={styles.imageStyle} resizeMode={'contain'}/>
                            ) : (
                                <Image source={madagascar_08} style={styles.imageStyle} resizeMode={'contain'}/>
                            )
                    }
                </TouchableOpacity>
                <Text style={styles.textStyle}>
                    {this.props.textPrompt}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 160,
        height: 120
    },
    textStyle: {
        fontSize: 20,
    }
});
