import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

export default class DataHandler extends Component {

    static realDiaryList = [];
    static realDiarySection = [];
    static listIndex = 0;

    static getAllTheDiary() {
        console.log('**********DataHandle.getAllTheDiary() is called.**********');
        return new Promise(function (resolve, reject) {
            AsyncStorage.getAllKeys().then(
                (keys) => {
                    if (keys.length === 0) {
                        resolve(DataHandler.realDiaryList);
                    } else {
                        AsyncStorage.multiGet(keys).then(
                            (results) => {
                                DataHandler.listIndex = results.length - 1;

                                let diaryObj, sectionID;
                                for (let i = 0; i < results.length; i++) {
                                    diaryObj = results[i][1];
                                    sectionID = diaryObj.sectionID;
                                    DataHandler.realDiaryList[i] = diaryObj;
                                    if (DataHandler.realDiaryList[sectionID] == undefined) {
                                        DataHandler.realDiaryList[sectionID] = [];
                                    }
                                    DataHandler.realDiaryList[sectionID].push(diaryObj);

                                    if (!DataHandler.realDiarySection.includes(sectionID)) {
                                        DataHandler.realDiarySection.push(sectionID);
                                    }

                                    console.log("==================================DataHandler.getAllTheDiary() Item " + i + ".index: " + diaryObj.index);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() Item " + i + ".sectionID: " + diaryObj.sectionID);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() Item " + i + ".diaryMood: " + diaryObj.diaryMood);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() Item " + i + ".diaryTime: " + diaryObj.diaryTime);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() Item " + i + ".diaryTitle: " + diaryObj.diaryTitle);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() Item " + i + ".diaryBody: " + diaryObj.diaryBody);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() DataHandler.realDiaryList.length: " + DataHandler.realDiaryList.length);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() DataHandler.realDiarySection.length: " + DataHandler.realDiarySection.length);
                                    console.log("==================================DataHandlerDataHandler.getAllTheDiary() DataHandler.realDiaryList[" + sectionID + "].length: " + DataHandler.realDiaryList[sectionID].length);
                                }

                                // DataHandler.bubleSortDiaryList(); // TODO to be programmed.

                                // resolve(DataHandler.realDiaryList);
                                resolve({
                                    diaryList: DataHandler.realDiaryList,
                                    diarySection: DataHandler.realDiarySection
                                });
                            }
                        ).catch(
                            (error) => {
                                console.log("DataHandler.getAllTheDiary() AsyncStorage.multiGet() Failed. Message:" + error.message);
                                // resolve(DataHandler.realDiaryList);
                                resolve({
                                    diaryList: DataHandler.realDiaryList,
                                    diarySection: DataHandler.realDiarySection
                                });
                            }
                        );
                    }
                }
            ).catch(
                (error) => {
                    console.log("DataHandler.getAllTheDiary() AsyncStorage.getAllKeys() Failed. Message:" + error.message);
                    // resolve(DataHandler.realDiaryList);
                    resolve({
                        diaryList: DataHandler.realDiaryList,
                        diarySection: DataHandler.realDiarySection
                    });
                }
            )
        });
    }

    // TODO 各个分组内重新排序
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

    // TODO 需返回当前分组内的前一元素(或，事先按分组书序排序完毕？)
    static getPreviousDiary() {
        if (DataHandler.listIndex > 0) {
            DataHandler.listIndex--;
            // let diaryObj = DataHandler.realDiaryList[DataHandler.listIndex];
            // return {
            //     diaryMood: diaryObj.diaryMood,
            //     diaryTime: diaryObj.diaryTime,
            //     diaryTitle: diaryObj.diaryTitle,
            //     diaryBody: diaryObj.diaryBody
            // };
            return DataHandler.realDiaryList[DataHandler.listIndex];
        }
        return null;
    }

    // TODO 需返回当前分组内的后一元素(或，事先按分组书序排序完毕？)
    static getNextDiary() {
        if (DataHandler.listIndex < DataHandler.realDiaryList.length - 1) {
            DataHandler.listIndex++;
            // let diaryObj = DataHandler.realDiaryList[DataHandler.listIndex];
            // return {
            //     diaryMood: diaryObj.diaryMood,
            //     diaryTime: diaryObj.diaryTime,
            //     diaryTitle: diaryObj.diaryTitle,
            //     diaryBody: diaryObj.diaryBody
            // };
            return DataHandler.realDiaryList[DataHandler.listIndex];
        }
        return null;
    }

    static getDiaryAtIndex(index) {
        console.log('**********DataHandle.getDiaryAtIndex() is called.**********');
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
        console.log('**********DataHandle.saveDiary() is called.**********');
        return new Promise(function (resolve, reject) {
            let sysDate = new Date();
            let timeString = sysDate.getFullYear() + "年" + (sysDate.getMonth() + 1) + "月" + sysDate.getDate() + "日 "
                + sysDate.getHours() + ":" + sysDate.getMinutes() + ":" + sysDate.getSeconds();
            let sectionID = sysDate.getHours() + ":" + sysDate.getMinutes();

            let diaryObj = {
                index: Date.parse(sysDate),
                sectionID: sectionID,
                diaryTime: timeString,
                diaryMood: diaryMood,
                diaryTitle: diaryTitle,
                diaryBody: diaryBody
            };

            AsyncStorage.setItem('' + diaryObj.index, JSON.stringify(diaryObj)).then(
                () => {
                    let totalLength = DataHandler.realDiaryList.length;
                    DataHandler.realDiaryList[totalLength] = diaryObj;
                    DataHandler.listIndex = totalLength;

                    if (DataHandler.realDiaryList[sectionID] == undefined) {
                        DataHandler.realDiaryList[sectionID] = [];
                    }
                    DataHandler.realDiaryList[sectionID].push(diaryObj);

                    if (!DataHandler.realDiarySection.includes(sectionID)) {
                        DataHandler.realDiarySection.push(sectionID);
                    }

                    resolve({
                        uiCode: 1,
                        diaryList: DataHandler.realDiaryList,
                        diarySection: DataHandler.realDiarySection
                    });
                }
            ).catch(
                (error) => {
                    console.log("DataHandler.saveDiary() Failed. Message:" + error.message);
                }
            );
        });
    }

    static clearDiary() {
        console.log('**********DataHandle.clearDiary() is called.**********');
        return new Promise(function (resolve, reject) {
            AsyncStorage.clear().then(
                () => {
                    DataHandler.realDiaryList = [];
                    DataHandler.realDiarySection = [];
                    resolve({
                        diaryList: DataHandler.realDiaryList,
                        diarySection: DataHandler.realDiarySection
                    });
                }
            ).catch(
                (error) => {
                    console.log("DataHandler.clearDiary() Failed. Message:" + error.message);
                }
            );
        });
    }
}
