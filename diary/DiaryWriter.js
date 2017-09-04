import React, {Component} from 'react';
import {View, Text, TextInput, StatusBar, Alert, TouchableOpacity} from 'react-native';
import DiaryStyles from './DiaryStyles';

let angryMood = require('../image/madagascar_01.png');
let peaceMood = require('../image/madagascar_02.png');
let happyMood = require('../image/madagascar_03.png');
let sadMood = require('../image/madagascar_04.png');
let miseryMood = require('../image/madagascar_05.png');

export default class DiaryWriter extends Component {

    constructor(props) {
        super(props);

        this.moodCode = 1;
        this.diaryMood = null;
        this.diaryTitle = null;
        this.diaryBody = null;

        this.state = {
            moodText: '请选择心情'
        }
    }

    returnPressed() {
        Alert.alert(
            '确认',
            '确定要返回日记列表吗？',
            [
                {text: '确定', onPress: this.props.returnPressed},
                {text: '取消'}
            ]
        );
    }

    selectMood() {
        if (this.moodCode === 4) {
            this.moodCode = 0;
        } else {
            this.moodCode++;
        }

        let selectMood;
        switch (this.moodCode) {
            case 0:
                selectMood = '现在的心情：愤怒';
                this.diaryMood = angryMood;
                break;
            case 1:
                selectMood = '现在的心情：平静';
                this.diaryMood = peaceMood;
                break;
            case 2:
                selectMood = '现在的心情：高兴';
                this.diaryMood = happyMood;
                break;
            case 3:
                selectMood = '现在的心情：悲伤';
                this.diaryMood = sadMood;
                break;
            case 4:
                selectMood = '现在的心情：痛苦';
                this.diaryMood = miseryMood;
                break;
            default:
                selectMood = '现在的心情：平静';
                this.diaryMood = peaceMood;
                break;
        }

        this.setState({moodText: selectMood});
    }

    saveDiaryPressed() {
        if (this.diaryMood == null || this.diaryTitle == null || this.diaryBody == null) {
            Alert.alert(
                '错误',
                '请选择心情，填写日记题目和正文。',
                [
                    {text: '关闭'}
                ]
            );
        } else {
            this.props.saveDiary(this.diaryMood, this.diaryTitle, this.diaryBody);
        }
    }

    render() {
        return (
            <View style={DiaryStyles.container}>
                <StatusBar hidden={true}/>
                <View style={DiaryStyles.firstRow}>
                    <TouchableOpacity onPress={this.returnPressed.bind(this)}>
                        <Text style={DiaryStyles.smallButton}>
                            返回
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.selectMood.bind(this)}>
                        <Text style={DiaryStyles.longButton}>
                            {this.state.moodText}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.saveDiaryPressed.bind(this)}>
                        <Text style={DiaryStyles.smallButton}>
                            保存
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput style={DiaryStyles.titleInputStyle} placeholder={'日记标题'} onChangeText={(text) => this.diaryTitle = text} />
                <TextInput style={DiaryStyles.diaryBodyStyle} multiline={true} placeholder={'日记正文'} onChangeText={(text) => this.diaryBody = text} />
            </View>
        );
    }
}