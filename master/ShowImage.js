import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

let imageAddress = {
    uri: 'http://d.lanrentuku.com/down/png/1505/android-lollipop-icon-set-by-tinylab.jpg',
    headers: {
        Authorization: 'someAuthToken',
    }
};

// let pixelRatio = require('PixelRatio').get();

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageHeight: 180
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container1}>
                    <Image style={[styles.imageStyle, {height: 180}]} source={imageAddress} resizeMode={'cover'}/>
                    <Image style={[styles.imageStyle, {height: this.state.imageHeight}]} source={imageAddress} resizeMode={'contain'}/>
                    <Text style={{marginTop: 30}}>我在图片下方30像素处</Text>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity onPress={this.scaleZoomIn.bind(this)}>
                        <View style={styles.buttonStyle}>
                            <Text>图片缩小</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.scaleZoomOut.bind(this)}>
                        <View style={styles.buttonStyle}>
                            <Text>图片放大</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    componentDidMount() {
        // Image.getSize(imageAddress.uri).then(
        //     (width, height) => {
        //         console.log("---------------------imageWidth:" + width);
        //         console.log("---------------------imageHeight:" + height);
        //         this.setState({
        //             imageWidth: width,
        //             imageHeight: height
        //         });
        //     }
        // ).catch(
        //     (error) => {
        //         console.log("---------------------Image.getSize Error!");
        //         console.log(error);
        //         this.setState({
        //             imageWidth: 260,
        //             imageHeight: 180
        //         });
        //     }
        // );
    }

    scaleZoomIn() {
        this.setState((prevState, props) => {
            return {
                imageHeight: prevState.imageHeight - 20
            };
        });
    }

    scaleZoomOut() {
        this.setState((prevState, props) => {
            return {
                imageHeight: prevState.imageHeight + 20
            };
        });
    }
}

var styles = StyleSheet.create({
    container1: {
        flex: 8,
        backgroundColor: 'grey',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'grey',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageStyle: {
        margin: 2,
        backgroundColor: 'white',
        width: 260,
    },
    buttonStyle: {
        backgroundColor: 'gray',
        height: 30
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
