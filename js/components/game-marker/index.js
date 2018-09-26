'use strict';

import React from "react";
import { StyleSheet } from "react-native";

import {
    ViroARImageMarker,
    ViroText
 } from "react-viro";

const GameMarker = props => {
    const { name } = props;

    return (
        <ViroARImageMarker target={name}>
            <ViroText text={name} scale={[.2, .2, .2]} position={[0, .1, 0]} styles={styles} />
        </ViroARImageMarker>
    );
}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',  
    },
});

export default GameMarker;