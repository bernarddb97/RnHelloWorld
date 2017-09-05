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
                        resolve(DataHandler.realDiaryList);
                    } else {
                        AsyncStorage.multiGet(keys).then(
                            (results) => {
                                for (let idx = 0; idx < results.length; idx++) {
                                    DataHandler.realDiaryList[idx] = results[idex][1];
                                }
                                DataHandler.listIndex = results.length - 1;

                                DataHandler.bubleSortDiaryList();
                                resolve(DataHandler.realDiaryList);
                            }
                        ).catch(
                            (error) => {
                                console.log("DataHandler.getAllTheDiary() AsyncStorage.multiGet() Failed. Message:" + error.message);
                                resolve(DataHandler.realDiaryList);
                            }
                        );
                    }
                }
            ).catch(
                (error) => {
                    console.log("DataHandler.getAllTheDiary() AsyncStorage.getAllKeys() Failed. Message:" + error.message);
                    resolve(DataHandler.realDiaryList);
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
                diaryMood: diaryObj.diaryMood,
                diaryTime: diaryObj.diaryTime,
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
                diaryMood: diaryObj.diaryMood,
                diaryTime: diaryObj.diaryTime,
                diaryTitle: diaryObj.diaryTitle,
                diaryBody: diaryObj.diaryBody
            };
        }
        return null;
    }

    static getDiaryAtIndex(index) {
        DataHandler.listIndex = index;
        let diaryObj = DataHandler.realDiaryList[index];
        return {
            uiCode: 2,
            diaryMood: diaryObj.diaryMood,
            diaryTime: diaryObj.diaryTime,
            diaryTitle: diaryObj.diaryTitle,
            diaryBody: diaryObj.diaryBody
        };
    }

    static saveDiary(diaryMood, diaryTitle, diaryBody) {
        console.log('DataHandle.saveDiary() is called.');
        return new Promise(function (resolve, reject) {
            let sysDate = new Date();
            let timeString = sysDate.getFullYear() + "年" + (sysDate.getMonth() + 1) + "月" + sysDate.getDate() + "日 "
                + sysDate.getHours() + ":" + sysDate.getMinutes() + ":" + sysDate.getSeconds();

            let diaryObj = new Object();
            diaryObj.index = Date.parse(sysDate);
            diaryObj.diaryTime = timeString;
            diaryObj.diaryMood = diaryMood;
            diaryObj.diaryTitle = diaryTitle;
            diaryObj.diaryBody = diaryBody;
            diaryObj.sectionID = sysDate.getFullYear() + "年" + (sysDate.getMonth() + 1) + "月";

            AsyncStorage.setItem('' + diaryObj.index, JSON.stringify(diaryObj)).then(
                () => {
                    let totalLength = DataHandler.realDiaryList.length;
                    DataHandler.realDiaryList[totalLength] = diaryObj;
                    DataHandler.listIndex = totalLength;

                    resolve({
                        uiCode: 1,
                        diaryList: DataHandler.realDiaryList
                    });
                }
            ).catch(
                (error) => {
                    console.log("DataHandler.saveDiary() Failed. Message:" + error.message);
                }
            );
        });
    }
}
