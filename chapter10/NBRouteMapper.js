import React from 'react';
import {StyleSheet, Text} from 'react-native';

var NBRouteMapper = {

    Title(route, navigator, index, navState) {
        let uiIndex = (route.UIIndex % 13) + 1;
        return (
            <Text style={styles.titleStyle}>
                第{uiIndex}个界面
            </Text>
        );
    },

    LeftButton(route, navigator, index, navState) {
        if (index > 0) {
            return (
                <Text style={styles.buttonStyle}
                      onPress={() => {
                          route.leftCallback(route.UIIndex);
                          navigator.jumpBack();
                      }}>
                    上一个
                </Text>
            );
        } else {
            return (
                <Text style={[styles.buttonStyle, {color: 'red'}]}>
                    上一个
                </Text>
            );
        }
    },

    RightButton(route, navigator, index, navState) {
        if (index === navState.sceneConfigStack.length - 1) {
            return (
                <Text style={[styles.buttonStyle, {color: 'red'}]}>
                    下一个
                </Text>
            );
        } else {
            return (
                <Text style={styles.buttonStyle}
                      onPress={() => {
                          route.rightCallback(route.UIIndex);
                          navigator.jumpForward();
                      }}>
                    下一个
                </Text>
            );
        }
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    },
    buttonStyle: {
        fontSize: 20,
        margin: 10,
        width: 70,
        backgroundColor: 'gray'
    },
});

export default NBRouteMapper;