import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, TextInput, TouchableOpacity, View, WebView, StatusBar} from 'react-native';

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);

        this.state = {
            source: {
                uri: 'http://es6.ruanyifeng.com'
            }
        };

        this.status = 'No Page Loaded.';
        this.backButtonEnabled = false;
        this.forwardButtonEnabled = false;
        this.inputUrl = 'http://es6.ruanyifeng.com';

        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.onPressGoButton = this.onPressGoButton.bind(this);
    }

    goBack() {
        this.refs.webViewRef.goBack();
    }

    goForward() {
        this.refs.webViewRef.goForward();
    }

    onNavigationStateChange(navState) {
        this.setState({
            status: navState.title,
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
        });
    }

    onPressGoButton() {
        if (this.inputUrl == this.state.source.uri) {
            console.log("*****************this.inputUrl:" + this.inputUrl);
            this.refs.webViewRef.reload();
        } else {
            let source = {};
            source.uri = this.inputUrl;
            console.log("*****************source.uri:" + source.uri);
            this.setState({source});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={styles.addressBarRow}>
                    <TouchableOpacity
                        style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}
                        onPress={this.goBack}>
                        <Text>
                            {'<'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}
                        onPress={this.goForward}>
                        <Text>
                            {'>'}
                        </Text>
                    </TouchableOpacity>
                    <TextInput ref='inputUrlRef' style={styles.addressBarText}
                               underlineColorAndroid={'white'}
                               defaultValue={this.state.source.uri}
                               onSubmitEditing={this.onPressGoButton}
                               onChangeText={(newText) => this.inputUrl = newText}
                               clearButtonMode='while-editing'/>
                    <TouchableOpacity style={[styles.navButton, {width: 30}]} onPress={this.onPressGoButton}>
                        <Text>
                            {'Go'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <WebView
                    ref='webViewRef'
                    style={styles.webView}
                    source={this.state.source}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    onNavigationStateChange={this.onNavigationStateChange}/>
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.status}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AAAAFF',
    },
    addressBarRow: {
        flexDirection: 'row',
        margin: 8
    },
    webView: {
        height: 350,
        backgroundColor: 'white',
    },
    addressBarText: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'transparent',
        height: 24,
        fontSize: 16,
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        borderRadius: 3,
        backgroundColor: 'white'
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginLeft: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        borderRadius: 3,
        backgroundColor: 'grey'
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
