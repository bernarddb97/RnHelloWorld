import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import ImageDisplayer from './ImageDisplayer';
import NBRouteMapper from './NBRouteMapper';

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);

        this.state = {
            UIIndex: 0,
            textPrompt: ''
        }

        this.touchTime = 0;
        this.switchSceneStyle = Navigator.SceneConfigs.PushFromRight;
        this.initialRoute = {
            UIIndex: 0,
            leftCallback: this.callbackForLeftButton,
            rightCallback: this.callbackForRightButton
        }

        this.configureScene = this.configureScene.bind(this);
        this.renderScene = this.renderScene.bind(this);
        this.changeStateBeforeRoute = this.changeStateBeforeRoute.bind(this);
    }

    configureScene(route) {
        return this.switchSceneStyle;
    }

    renderScene(router, navigator) {
        return <ImageDisplayer UIIndex={this.state.UIIndex} textPrompt={this.state.textPrompt}
                               leftCallback={this.callbackForLeftButton} rightCallback={this.callbackForRightButton}
                               navigator={navigator} callback={this.changeStateBeforeRoute}/>;
    }

    callbackForLeftButton(aNumber) {
        console.log("********** HelloWorld.callbackForLeftButton() is called. **********" + aNumber);
    }

    callbackForRightButton(aNumber) {
        console.log("********** HelloWorld.callbackForRightButton() is called. **********" + aNumber);
    }

    changeStateBeforeRoute() {
        this.touchTime++;
        let textPrompt;
        switch (this.touchTime % 13) {
            case 0:
                this.switchSceneStyle = Navigator.SceneConfigs.PushFromRight;
                textPrompt = 'PushFromRight';
                break;
            case 1:
                this.switchSceneStyle = Navigator.SceneConfigs.PushFromLeft;
                textPrompt = 'PushFromLeft';
                break;
            case 2:
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromRight;
                textPrompt = 'FloatFromRight';
                break;
            case 3:
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromLeft;
                textPrompt = 'FloatFromLeft';
                break;
            case 4:
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromBottom;
                textPrompt = 'FloatFromBottom';
                break;
            case 5:
                this.switchSceneStyle = Navigator.SceneConfigs.FloatFromBottomAndroid;
                textPrompt = 'FloatFromBottomAndroid';
                break;
            case 6:
                this.switchSceneStyle = Navigator.SceneConfigs.FadeAndroid;
                textPrompt = 'FadeAndroid';
                break;
            case 7:
                this.switchSceneStyle = Navigator.SceneConfigs.SwipeFromLeft;
                textPrompt = 'SwipeFromLeft';
                break;
            case 8:
                this.switchSceneStyle = Navigator.SceneConfigs.HorizontalSwipeJump;
                textPrompt = 'HorizontalSwipeJump';
                break;
            case 9:
                this.switchSceneStyle = Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                textPrompt = 'HorizontalSwipeJumpFromRight';
                break;
            case 10:
                this.switchSceneStyle = Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
                textPrompt = 'HorizontalSwipeJumpFromLeft';
                break;
            case 11:
                this.switchSceneStyle = Navigator.SceneConfigs.VerticalUpSwipeJump;
                textPrompt = 'VerticalUpSwipeJump';
                break;
            case 12:
                this.switchSceneStyle = Navigator.SceneConfigs.VerticalDownSwipeJump;
                textPrompt = 'VerticalDownSwipeJump';
                break;
            default:
                this.switchSceneStyle = Navigator.SceneConfigs.PushFromRight;
                textPrompt = 'PushFromRight';
        }

        this.setState({
            textPrompt, UIIndex: this.state.UIIndex + 1,
        });
    }

    render() {
        return (
            <Navigator initialRoute={this.initialRoute}
                       configureScene={this.configureScene}
                       renderScene={this.renderScene}
                       navigationBar={<Navigator.NavigationBar routeMapper={NBRouteMapper}/>}/>
        );
    }
}

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
