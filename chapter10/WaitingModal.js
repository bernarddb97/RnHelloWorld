import React, {Component} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';

export default class WaitingModal extends Component {

    render() {
        return (
            <Modal transparent={true} visible={this.props.show} onRequestClose={() => {}}>
                <View style={styles.mainViewStyle}>
                    <View style={styles.contentViewStyle}>
                        <Text style={styles.textStyle}>
                            {this.props.modalText}
                        </Text>
                        <ActivityIndicator animating={true} color={'blue'} size={'large'}/>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentViewStyle: {
        backgroundColor: 'white',
    },
    textStyle: {
        margin: 30,
        fontSize: 30,
    },
});
