import React, {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';

var viewInterface = {
    name: 'KenBurnsView',
    propTypes: {
        imgSource: PropTypes.string,
        ...View.propTypes
    }
}

module.exports = requireNativeComponent('KenBurnsView', viewInterface);