import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View} from 'react-native';

let imageAddress = {
    uri: 'http://d.lanrentuku.com/down/png/1505/android-lollipop-icon-set-by-tinylab.jpg',
    headers: {
        Authorization: 'someAuthToken',
    }
};

let imageWidth = 160;
let imageHeight = 120;

let PixelRatio = require('PixelRatio');
let pixelRatio = PixelRatio.get();

export default class HelloWorld extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={imageAddress} resizeMode={'cover'}/>
                <Image style={styles.imageStyle} source={imageAddress} resizeMode={'contain'}/>
                <Image style={styles.imageStyle} source={imageAddress} resizeMode={'stretch'}/>
                <Image style={styles.imageStyle} source={imageAddress} resizeMode={'center'}/>
            </View>
        );
    }

    componentDidMount() {
        Image.getSize(imageAddress.uri).then(
            (width, height) => {
                imageWidth = width;
                imageHeight = height;
                console.log("---------------------imageWidth:" + imageWidth);
                console.log("---------------------imageHeight:" + imageHeight);
            }
        ).catch(
            (error) => {
                console.log("---------------------Image.getSize Error!");
                imageWidth = 160;
                imageHeight = 120;
                console.log(error);
            }
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        margin: 2,
        backgroundColor: 'white',
        width: imageWidth,
        height: imageHeight
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
