import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Switch} from 'react-native';

export default class HelloWorld extends Component {

    constructor(props) {
        super(props);
        this.state = {
            switchValue: true
        }
        this._onValueChange = this._onValueChange.bind(this);
    }

    _onValueChange() {
        this.setState({
            switchValue: !this.state.switchValue
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{height: 200}}>
                    <Switch style={styles.switchStyle} value={this.state.switchValue} onValueChange={this._onValueChange} />
                    <Switch style={styles.switchStyle} value={!this.state.switchValue} onValueChange={this._onValueChange} />
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    switchStyle: {
        margin: 20,
    },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
