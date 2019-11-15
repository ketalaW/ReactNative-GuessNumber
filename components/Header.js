import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Colors from '../constans/color';
import Titletext from './titleText';

const Header = props => {
    return (
        <View style={styles.header}>
            <Titletext style = {styles.headerTitle} >
                {props.title}
            </Titletext>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignContent: 'center',
        justifyContent: 'center',

    },
    headerTitle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
});

export default Header;