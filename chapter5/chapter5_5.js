import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'

export default class NaviModule extends Component {

    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }

    configureScene(route) {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    renderScene(router, navigator) {
        this.navigator = navigator;
        switch (router.name) {
            case "Page1" :
                return <Page1 navigator={navigator}/>;
            case "Page2":
                return <Page2 navigator={navigator}/>;
            case "Page3":
                return <Page3 navigator={navigator}/>;
            case "Page4":
                return <Page4 navigator={navigator}/>;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'Page1'}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}/>
        );
    }
}

AppRegistry.registerComponent('HelloWorld', () => NaviModule);
