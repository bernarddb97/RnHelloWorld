import React, {Component} from 'react';
import {Alert, AppRegistry} from 'react-native';
import DiaryList from './DiaryList';
import DiaryReader from './DiaryReader';
import DiaryWriter from './DiaryWriter';
import DataHandle from './DataHandler';

export default class DiaryMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uiCode: 1,
            diaryList: [],
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
        this.saveDiary = this.saveDiary.bind(this);
        this.readingPreviousPressed = this.readingPreviousPressed.bind(this);
        this.readingNextPressed = this.readingNextPressed.bind(this);
        this.searchKeyword = this.searchKeyword.bind(this);
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

    saveDiary(diaryMood, diaryTitle, diaryBody) {
        DataHandle.saveDiary(diaryMood, diaryTitle, diaryBody).then(
            (result) => {
                this.setState(result);
            }
        ).catch(
            (error) => {
                console.log("Save Diary failed. Message:" + error.message);
            }
        );

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

    searchKeyword(newText) {
        console.log("Search Keyword is: " + newText);
    }

    selectListItem(rowID) {
        this.setState(DataHandle.getDiaryAtIndex(rowID));
    }

    showDiaryList() {
        return <DiaryList selectListItem={this.selectListItem}
                          writeDiary={this.writeDiary}
                          diaryList={this.state.diaryList}
                          searchKeyword={this.searchKeyword}/>;
    }

    showDiaryReader() {
        return <DiaryReader diaryMood={this.state.diaryMood}
                            diaryTime={this.state.diaryTime}
                            diaryTitle={this.state.diaryTitle}
                            diaryBody={this.state.diaryBody}
                            returnPressed={this.returnPressed}
                            readingPreviousPressed={this.readingPreviousPressed}
                            readingNextPressed={this.readingNextPressed}/>;
    }

    showDiaryWriter() {
        return <DiaryWriter returnPressed={this.returnPressed}
                            saveDiary={this.saveDiary}/>;
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
