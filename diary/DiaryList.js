import React, {Component} from 'react';
import {Image, ListView, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DiaryStyles from './DiaryStyles';

let angryMood = require('../image/madagascar_01.png');

export default class DiaryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            diaryListDS: new ListView.DataSource({
                rowHasChanged: (oldRow, newRow) => oldRow !== newRow,
                sectionHeaderHasChanged: (oldSH, newSH) => oldSH !== newSH
            })
        }
        this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
    }

    componentWillMount() {
        console.log("**********DiaryList.componentWillMount() is called.**********");
        if (this.props.diaryList !== null) {
            this.setState({
                // diaryListDS: this.state.diaryListDS.cloneWithRows(this.props.diaryList)
                diaryListDS: this.state.diaryListDS.cloneWithRowsAndSections(this.props.diaryList, this.props.diarySection)
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("**********DiaryList.componentWillReceiveProps() is called.**********");
        this.setState({
            // diaryListDS: this.state.diaryListDS.cloneWithRows(nextProps.diaryList)
            diaryListDS: this.state.diaryListDS.cloneWithRowsAndSections(nextProps.diaryList, nextProps.diarySection)
        });
    }

    updateSearchKeyword(newText) {
        this.props.updateSearchKeyword(newText);
    }

    renderListItem(rowData, sectionID, rowID) {
        console.log("**********DiaryList.renderListItem() is called.**********");
        return (
            <TouchableOpacity onPress={() => this.props.selectListItem(rowID)}>
                <View style={DiaryStyles.secondRow}>
                    <Image style={DiaryStyles.moodStyle} source={rowData.diaryMood}/>
                    <View style={DiaryStyles.subViewInReader}>
                        <Text style={DiaryStyles.textInReader}>
                            {rowData.diaryTitle}
                        </Text>
                        <Text style={DiaryStyles.textInReader}>
                            {rowData.diaryTime}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderHeader() {
        return (
            <View style={DiaryStyles.section}>
                <Text style={DiaryStyles.sectionText}>
                    我是Header我是Header
                </Text>
            </View>
        );
    }

    renderFooter() {
        return (
            <View style={DiaryStyles.section}>
                <Text style={DiaryStyles.sectionText}>
                    我是Footer我是Footer
                </Text>
            </View>
        );
    }

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={DiaryStyles.section}>
                <Text style={DiaryStyles.sectionHeaderText}>
                    {sectionID}
                </Text>
            </View>
        );
    }

    renderSeparator() {
        return (
            <View style={DiaryStyles.separatorStyle} />
        );
    }

    render() {
        return (
            <View style={DiaryStyles.container}>
                <StatusBar hidden={true}/>
                <View style={DiaryStyles.firstRow}>
                    <View style={{borderWidth: 1}}>
                        <TextInput placeholder='输入搜索关键字' style={DiaryStyles.searchBarTextInput}/>
                    </View>
                    <TouchableOpacity onPress={this.props.writeDiary}>
                        <Text style={DiaryStyles.middleButton}>
                            写日记
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.clearDiary}>
                        <Text style={DiaryStyles.middleButton}>
                            清空
                        </Text>
                    </TouchableOpacity>
                </View>
                {(
                    (this.props.diaryList.length > 0) ?
                        (<ListView dataSource={this.state.diaryListDS} renderRow={this.renderListItem}
                                   renderHeader={this.renderHeader} renderFooter={this.renderFooter}
                                   renderSectionHeader={this.renderSectionHeader}
                                   renderSeparator={this.renderSeparator}/>) :
                        (<View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 18}}>
                                还没有日记，快去写一篇吧。
                            </Text>
                        </View>)
                )}
            </View>
        );
    }
}
