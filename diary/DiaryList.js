import React, {Component} from 'react';
import {Image, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DiaryStyles from './DiaryStyles';

let angryMood = require('../image/madagascar_01.png');

export default class DiaryList extends Component {

    constructor(props) {
        super(props);
        this.updateSearchKeyword = this.updateSearchKeyword.bind(this);
    }

    updateSearchKeyword() {

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
                </View>
                <View/>
                <View style={DiaryStyles.secondRow}>
                    <Image style={DiaryStyles.moodStyle} source={angryMood}/>
                    <View style={DiaryStyles.subViewInReader}>
                        <TouchableOpacity onPress={this.props.selectListItem}>
                            <Text style={DiaryStyles.textInReader}>
                                某变量记录日记标题
                            </Text>
                        </TouchableOpacity>
                        <Text style={DiaryStyles.textInReader}>
                            某变量记入日记时间
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
