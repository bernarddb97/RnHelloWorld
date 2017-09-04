import React, {Component} from 'react';
import {AppRegistry, Alert} from 'react-native';
import DiaryList from './DiaryList';
import DiaryReader from './DiaryReader';
import DiaryWriter from './DiaryWriter';
import DataHandle from './DataHandler';

export default class DiaryMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uiCode: 1,
            diaryMood: null,
            diaryTime: 'Reading...',
            diaryTitle: 'Reading...',
            diaryBody: 'Reading...'
        };

        this.bindAllMyFunction();
        DataHandle.getAllTheDiary().then(
            (result) => {
                this.setState(result);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    bindAllMyFunction() {
        this.selectListItem = this.selectListItem.bind(this);
        this.writeDiary = this.writeDiary.bind(this);
        this.returnPressed = this.returnPressed.bind(this);
        this.saveDiaryAndReturn = this.saveDiaryAndReturn.bind(this);
        this.readingPreviousPressed = this.readingPreviousPressed.bind(this);
        this.readingNextPressed = this.readingNextPressed.bind(this);
    }

    readingPreviousPressed() {
        let stateObj = DataHandle.getPreviousDiary();
        if (stateObj !== null) {
            this.setState(stateObj);
        }
    }

    readingNextPressed() {
        let stateObj = DataHandle.getNextDiary();
        if (stateObj !== null) {
            this.setState(stateObj);
        }
    }

    returnPressed() {
        this.setState({uiCode: 1});
    }

    saveDiaryAndReturn(diaryMood, diaryTitle, diaryBody) {
        DataHandle.saveDiary(diaryMood, diaryTitle, diaryBody).then(
            (result) => {
                this.setState(result);
            }
        ).catch(
            (error) => {
                console.log("Save Diary failed. Message:" + error.message);
            }
        )

        Alert.alert(
            '通知',
            '日记保存成功。',
            [
                {text: '关闭'}
            ]
        );
    }

    writeDiary() {
        this.setState({uiCode: 3});
    }

    searchKeyWord() {

    }

    selectListItem() {
        this.setState({uiCode: 2});
    }

    showDiaryList() {
        return <DiaryList selectListItem={this.selectListItem} writeDiary={this.writeDiary}/>;
    }

    showDiaryReader() {
        return <DiaryReader diaryMood={this.state.diaryMood} diaryTime={this.state.diaryTime} diaryTitle={this.state.diaryTitle} diaryBody={this.state.diaryBody}
                            returnPressed={this.returnPressed} readingPreviousPressed={this.readingPreviousPressed} readingNextPressed={this.readingNextPressed} />;
    }

    showDiaryWriter() {
        return <DiaryWriter returnPressed={this.returnPressed} saveDiary={this.saveDiaryAndReturn} />;
    }

    render() {
        if (this.state.uiCode === 1) {
            return this.showDiaryList();
        }
        if (this.state.uiCode === 2) {
            return this.showDiaryReader();
        }
        if (this.state.uiCode === 3) {
            return this.showDiaryWriter();
        }
    }
}

AppRegistry.registerComponent('HelloWorld', () => DiaryMain);
