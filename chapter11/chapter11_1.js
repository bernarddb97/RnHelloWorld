import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    PanResponder,
    Platform,
    ProgressBarAndroid,
    ProgressViewIOS,
    StyleSheet,
    Text,
    View
} from 'react-native';

let totolWidth = Dimensions.get('window').width;

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);

        this.watcher = null;
        this.state = {
            progress: 0,
        }

        this._onPanResponderGrant = this._onPanResponderGrant.bind(this);
        this._onPanResponderMove = this._onPanResponderMove.bind(this);
    }

    componentWillMount() {
        this.watcher = PanResponder.create({
            // onStartShouldSetResponder: () => true, // WebStorm提示的属性名有问题
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: this._onPanResponderGrant,
            onPanResponderMove: this._onPanResponderMove
        });
    }

    _onPanResponderGrant(event, gestureState) {
        console.log("********** _onPanResponderGrant is called. **********");
        let progress;
        let pointX = gestureState.x0;
        if (pointX < 20) {
            progress = 0;
        } else if (pointX > totolWidth - 20) {
            progress = 1;
        } else {
            progress = (pointX - 20) / (totolWidth - 40);
        }
        this.setState({progress});
    }

    _onPanResponderMove(event, gestureState) {
        console.log("********** _onPanResponderGrant is called. **********");
        let progress;
        let pointX = gestureState.moveX;
        if (pointX < 20) {
            progress = 0;
        } else if (pointX > totolWidth - 20) {
            progress = 1;
        } else {
            progress = (pointX - 20) / (totolWidth - 40);
        }
        this.setState({progress});
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    (
                        (Platform.OS === 'ios') ?
                            (
                                <ProgressViewIOS style={styles.progressBarStyle} progress={this.state.progress}/>
                            ) : (
                                <ProgressBarAndroid style={styles.progressBarStyle} styleAttr={'Horizontal'}
                                                    indeterminate={false} progress={this.state.progress}/>
                            )
                    )
                }
                <Text style={styles.textStyle}>
                    You ave set Progress to {Math.round(this.state.progress * 100)}%.
                </Text>
                <View style={styles.progressViewStyle} {...this.watcher.panHandlers}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressBarStyle: {
        width: totolWidth - 40,
        left: 20,
        top: 50
    },
    progressViewStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: totolWidth - 20,
        left: 10,
        top: 30,
        height: 40,
    },
    textStyle: {
        fontSize: 20,
        left: 20,
        top: 70
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
