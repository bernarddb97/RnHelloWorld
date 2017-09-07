import React, {Component} from 'react';
import {AppRegistry, Dimensions, StyleSheet, Text, View} from 'react-native';

let totolWidth = Dimensions.get('window').width;

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);
        this.state = {
            responseText: '',
        }
    }

    componentWillMount() {
        let REQUEST_URL = 'http://192.168.1.158:8090/chapter12_3.json';

        let privateHeaders = {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.5',
            Connection: '\tkeep-alive',
            'Content-Type': 'text/plain',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55.0'
        };

        let map = {
            method: 'POST',
            headers: privateHeaders,
            follow: 20,
            timeout: 0,
            size: 0,
            body: 'This is the Request Body.'
        };

        fetch(REQUEST_URL, map).then(
            (result) => {
                console.log("result.url:" + result.url);
                console.log("result.ok:" + result.ok);
                console.log("result.status:" + result.status);
                // console.log("result.statusText:" + result.statusText);
                // console.log("result.heads:" + result.heads);

                result.json().then(
                    (json) => {
                        this.setState({
                            responseText: JSON.stringify(json)
                            // responseText: 'name:' + json.name
                        });
                    }
                ).catch(
                    (error) => {
                        console.log('result.json(): ' + error.message);
                    }
                )
            }
        ).catch(
            (error) => {
                console.log('fetch API Error:' + error.message);
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    {this.state.responseText}
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        fontSize: 20,
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
