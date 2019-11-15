import React from 'react';
import {Text, View, TouchableOpacity,  StyleSheet} from 'react-native';
import Color from '../constans/color';


const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
            <View  style={styles.button} >
                <Text  style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    },
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 22
    }

});

export default MainButton;