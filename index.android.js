import React, {Component} from 'react';
import {AppRegistry, BackAndroid, Platform} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import LoginLeaf from './LoginLeaf';
import WaitingLeaf from './WaitingLeaf';

export default class NaviModule extends Component {

    constructor(props) {
        super(props);

        this.configureScene = this.configureScene.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
    }

    configureScene(route) {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    renderScene(router, navigator) {
        this.navigator = navigator;
        switch (router.name) {
            case "login" :
                return <LoginLeaf navigator={navigator}/>;
            case "waiting":
                return <WaitingLeaf navigator={navigator} phoneNumber={router.phoneNumber} userPW={router.userPW}/>;
        }
    }

    handleBackAndroid() {
        if (this.navigator.getCurrentRoutes().length > 1) {
            this.navigator.pop();
            return true;
        }
        return false;
    }

    componentDidMount() {
        if (Platform.OS === "android") {
            BackAndroid.addEventListener("hardwareBackPress", this.handleBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            BackAndroid.removeEventListener("hardwareBackPress", this.handleBackAndroid);
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'login'}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}/>
        );
    }
}

AppRegistry.registerComponent('HelloWorld', () => NaviModule);
