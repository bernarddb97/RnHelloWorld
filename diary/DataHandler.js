import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

export default class DataHandler extends Component {

    static realDiaryList = [];
    static listIndex = 0;

    static getAllTheDiary() {
        console.log('DataHandle.getAllTheDiary() is called.');
        return new Promise(function (resolve, reject) {
            AsyncStorage.getAllKeys().then(
                (keys) => {
                    if (keys.length === 0) {
                        let stateObj = {
                            diaryTime: '没有日记',
                            diaryTitle: '没有日记',
                            diaryBody: ''
                        };
                        resolve(stateObj);
                    } else {
                        AsyncStorage.multiGet(keys).then(
                            (results) => {
                                for (let idx = 0; idx < results.length; idx++) {
                                    DataHandler.realDiaryList[idx] = results[idex][1];
                                }
                                DataHandler.listIndex = results.length - 1;

                                DataHandler.bubleSortDiaryList();

                                let lastDiary = results[DataHandler.listIndex][1];
                                let stateObj = {
                                    diaryMood: lastDiary.diaryMood, // TODO 需要在这个时点转换成Ｉｍａｇｅ文件名吗？
                                    diaryTime: lastDiary.diaryTime,
                                    diaryTitle: lastDiary.diaryTitle,
                                    diaryBody: lastDiary.diaryBody
                                };
                                resolve(stateObj);
                            }
                        ).catch(
                            (error) => {
                                console.log("DataHandler.getAllTheDiary() Failed. AsyncStorage.multiGet() Message:" + error.message);
                                let stateObj = {
                                    diaryTime: '没有日记',
                                    diaryTitle: '没有日记',
                                    diaryBody: ''
                                };
                                resolve(stateObj);
                            }
                        )
                    }
                }
            ).catch(
                (error) => {
                    console.log("DataHandler.getAllTheDiary() AsyncStorage.getAllKeys() Failed. Message:" + error.message);
                    AsyncStorage.clear();
                    let stateObj = {
                        diaryTime: '没有日记',
                        diaryTitle: '没有日记',
                        diaryBody: ''
                    };
                    resolve(stateObj);
                }
            )
        });
    }

    static bubleSortDiaryList() {
        let tempObj;
        for (let i = 0; i < DataHandler.realDiaryList.length; i++) {
            for (let j = 0; j < DataHandler.realDiaryList.length - i - 1; j++) {
                if (DataHandler.realDiaryList[j].index > DataHandler.realDiaryList[j + 1].index) {
                    tempObj = DataHandler.realDiaryList[j];
                    DataHandler.realDiaryList[j] = DataHandler.realDiaryList[j + 1];
                    DataHandler.realDiaryList[j + 1] = tempObj;
                }
            }
        }
    }

    static getPreviousDiary() {
        if (DataHandler.listIndex > 0) {
            DataHandler.listIndex--;
            let diaryObj = DataHandler.realDiaryList[DataHandler.listIndex];
            return {
                diaryMood: diaryObj.diaryMood, // TODO 需要在这个时点转换成Ｉｍａｇｅ文件名吗？
                diaryTime: diaryObj.timeString,
                diaryTitle: diaryObj.diaryTitle,
                diaryBody: diaryObj.diaryBody
            };
        }
        return null;
    }

    static getNextDiary() {
        if (DataHandler.listIndex < DataHandler.realDiaryList.length - 1) {
            DataHandler.listIndex++;
            let diaryObj = DataHandler.realDiaryList[DataHandler.listIndex];
            return {
                diaryMood: diaryObj.diaryMood, // TODO 需要在这个时点转换成Ｉｍａｇｅ文件名吗？
                diaryTime: diaryObj.timeString,
                diaryTitle: diaryObj.diaryTitle,
                diaryBody: diaryObj.diaryBody
            };
        }
        return null;
    }

    static saveDiary(diaryMood, diaryTitle, diaryBody) {
        console.log('DataHandle.saveDiary() is called.');
        return new Promise(function (resolve, reject) {
            let sysDate = new Date();
            let timeString = sysDate.getFullYear() + "年" + sysDate.getMonth() + "月" + sysDate.getDate() + "日 星期" + sysDate.getDay()
                + "时间 " + sysDate.getHours() + ":" + sysDate.getMinutes() + ":" + sysDate.getSeconds();
            let diaryObj = Object();
            diaryObj.index = Date.parse(sysDate);
            diaryObj.diaryTime = sysDate;
            diaryObj.diaryMood = diaryMood;
            diaryObj.diaryTitle = diaryTitle;
            diaryObj.diaryBody = diaryBody;
            diaryObj.timeString = timeString;
            diaryObj.sectionID = "sectionID"; // TODO 下一章时使用

            AsyncStorage.setItem('' + diaryObj.index, JSON.stringify(diaryObj)).then(
                () => {
                    let totalLength = DataHandler.realDiaryList.length;
                    DataHandler.realDiaryList[totalLength] = diaryObj;
                    DataHandler.listIndex = totalLength;

                    let stateObj = {
                        uiCode: 1,
                        diaryMood: diaryMood, // TODO 需要在这个时点转换成Ｉｍａｇｅ文件名吗？
                        diaryTime: timeString,
                        diaryTitle: diaryTitle,
                        diaryBody: diaryBody
                    };
                    resolve(stateObj);
                }
            ).catch(
                (error) => {
                    console.log("DataHandler.saveDiary() Failed. Message:" + error.message);
                }
            );
        });
    }
}
