import React, {Component} from 'react';
import {AppRegistry, BackHandler, Platform, View} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import LoginLeaf from './LoginLeaf';
import WaitingLeaf from './WaitingLeaf';
import WaitingModal from './WaitingModal';

export default class NaviModule extends Component {

    constructor(props) {
        super(props);

        this.loginTimer = null;
        this.inputedNum = null;
        this.inputedPW = null;

        this.state = {
            showWaitingModal: false,
            modalText: ''
        }

        this.configureScene = this.configureScene.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.handleBackAndroid = this.handleBackAndroid.bind(this);
        this.userPressLogin = this.userPressLogin.bind(this);
        this.loginTimerTimeout = this.loginTimerTimeout.bind(this);
    }

    configureScene(route) {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    renderScene(router, navigator) {
        this.navigator = navigator;
        switch (router.name) {
            case "login" :
                return <LoginLeaf navigator={navigator} userPressLogin={this.userPressLogin}/>;
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
            BackHandler.addEventListener("hardwareBackPress", this.handleBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === "android") {
            BackHandler.removeEventListener("hardwareBackPress", this.handleBackAndroid);
        }
    }

    userPressLogin(aNumber, aPassword) {
        this.inputedNum = aNumber;
        this.inputedPW = aPassword;
        this.loginTimer = window.setTimeout(this.loginTimerTimeout, 3000);

        this.setState({
            showWaitingModal: true,
            modalText: '登录中，请稍候．．．'
        })
    }

    loginTimerTimeout() {
        this.loginTimer = null;
        this.setState({
            showWaitingModal: false,
            modalText: ''
        });
        this.navigator.push({
            name: 'waiting'
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Navigator
                    initialRoute={{name: 'login'}}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}/>
                <WaitingModal
                    show={this.state.showWaitingModal}
                    modalText={this.state.modalText}/>
            </View>
        );
    }
}

AppRegistry.registerComponent('HelloWorld', () => NaviModule);
