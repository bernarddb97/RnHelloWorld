import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

let totalWidth = Dimensions.get('window').width;
let naviButtonWidth = totalWidth / 4;
let naviButtonHeight = naviButtonWidth * 0.5;

export default class NaviBar extends Component {

    constructor(props) {
        super(props);
        this.naviTab0Pressed = this.naviTab0Pressed.bind(this);
        this.naviTab1Pressed = this.naviTab1Pressed.bind(this);
        this.naviTab2Pressed = this.naviTab2Pressed.bind(this);
        this.naviTab3Pressed = this.naviTab3Pressed.bind(this);
    }

    componentWillMount() {
        this.buttonColors = this.props.naviBarStatus.map(
            function (aNumber) {
                return aNumber == 0 ? 'white' : 'gray';
            }
        );
    }

    naviTab0Pressed() {
        this.props.onNaviBarPress(0);
    }

    naviTab1Pressed() {
        this.props.onNaviBarPress(1);
    }

    naviTab2Pressed() {
        this.props.onNaviBarPress(2);
    }

    naviTab3Pressed() {
        this.props.onNaviBarPress(3);
    }

    render() {
        return (
            <View style={styles.naviBarStyle}>
                <TouchableHighlight onPress={this.naviTab0Pressed}>
                    <View style={[styles.naviButtonStyle, {backgroundColor: this.buttonColors[0]}]}>
                        <Text style={styles.naviTextStyle}>
                            栏目一
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.naviTab1Pressed}>
                    <View style={[styles.naviButtonStyle, {backgroundColor: this.buttonColors[1]}]}>
                        <Text style={styles.naviTextStyle}>
                            栏目二
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.naviTab2Pressed}>
                    <View style={[styles.naviButtonStyle, {backgroundColor: this.buttonColors[2]}]}>
                        <Text style={styles.naviTextStyle}>
                            栏目三
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.naviTab3Pressed}>
                    <View style={[styles.naviButtonStyle, {backgroundColor: this.buttonColors[3]}]}>
                        <Text style={styles.naviTextStyle}>
                            栏目四
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

NaviBar.propTypes = {
    naviBarStatus: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    onNaviBarPress: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    naviBarStyle: {
        flexDirection: 'row'
    },
    naviButtonStyle: {
        width: naviButtonWidth,
        height: naviButtonHeight,
        justifyContent: 'center',
    },
    naviTextStyle: {
        textAlign: 'center',
        fontSize: 20,
    },
});
