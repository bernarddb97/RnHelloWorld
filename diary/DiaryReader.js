import React, {Component} from 'react';
import {Image, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DiaryStyles from './DiaryStyles';

let angryMood = require('../image/madagascar_01.png');

export default class DiaryReader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={DiaryStyles.container}>
                <StatusBar hidden={true}/>
                <View style={DiaryStyles.firstRow}>
                    <TouchableOpacity onPress={this.props.returnPressed}>
                        <Text style={DiaryStyles.middleButton}>
                            返回
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.readingPreviousPressed}>
                        <Text style={DiaryStyles.middleButton}>
                            上一篇
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.readingNextPressed}>
                        <Text style={DiaryStyles.middleButton}>
                            下一篇
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={DiaryStyles.secondRow}>
                    <Image style={DiaryStyles.moodStyle} source={this.props.diaryMood}/>
                    <View style={DiaryStyles.subViewInReader}>
                        <Text style={DiaryStyles.textInReader}>
                            {this.props.diaryTitle}
                        </Text>
                        <Text style={DiaryStyles.textInReader}>
                            {this.props.diaryTime}
                        </Text>
                    </View>
                </View>
                <TextInput style={[DiaryStyles.diaryBodyStyle, {color: 'black'}]} multiline={true} editable={false}
                           value={this.props.diaryBody}/>
            </View>
        );
    }
}