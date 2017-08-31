import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NaviBar from "./NaviBar";

export default class Page3 extends Component {

    constructor(props) {
        super(props);
        this.onNaviBarPress = this.onNaviBarPress.bind(this);
        this.naviBarStatus = [0, 0, 1, 0];
    }

    onNaviBarPress(pageNo) {
        switch (pageNo) {
            case 0:
                this.props.navigator.replace({name: 'Page1'});
                break;
            case 1:
                this.props.navigator.replace({name: 'Page2'});
                break;
            case 2:
                break;
            case 3:
                this.props.navigator.replace({name: 'Page4'});
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NaviBar naviBarStatus={this.naviBarStatus} onNaviBarPress={this.onNaviBarPress}/>
                <View style={styles.whatLeft}>
                    <Text style={styles.naviTextStyle}>
                        栏目三内容
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    whatLeft: {
        flex: 1,
        borderTopWidth: 2,
        paddingTop: 10,
        borderColor: 'black'
    },
    naviTextStyle: {
        textAlign: 'center',
        fontSize: 40,
    },
});
