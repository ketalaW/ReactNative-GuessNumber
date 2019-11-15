import React, { useState } from 'react';
import { Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet } from 'react-native';

import Card from '../components/card';
import Input from '../components/Input';
import Colors from '../constans/color';
import NumberContainer from '../components/numberContainer';
import BodyText from '../components/BodyText';
import Titletext from '../components/titleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(true);
    };


    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue);
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            check = 0;
            Alert.alert(
                'Niepoprawana liczba', 'Podana liczba musi sie znajdować w przedziale od 1 do 99',
                [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(choseNumber);
        setEnteredValue('');
        Keyboard.dismiss();

    };


    let confirmedOutput;

    if (confirmed && selectedNumber) {
        confirmedOutput = (
            <Card style={styles.boxNumber}>
                <BodyText style={styles.textInfo} > Wybrałeś numer: </BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress= {() => props.onStartGame(selectedNumber)} > Zacznij Gre </MainButton>  
            </Card>);
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <Titletext  style={styles.titleStart}>Zacznij nową gre !</Titletext >
                <Card style={styles.inputContainer}>
                    <BodyText style={styles.title}> Wybierz numer </BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="WYCZYŚĆ" onPress={resetInputHandler} color={Colors.secondary} /></View>
                        <View style={styles.button}><Button title="POTWIERDŹ" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    titleStart: {
        marginTop: 20,
        fontSize: 25,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        marginBottom: 30,
        textAlign: 'center',
    },
    textInfo: {
        textAlign: 'center',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    boxNumber: {
        marginTop: 25,
        width: '60%',
        alignItems: 'center'
    }
});

export default StartGameScreen;










// import React from 'react';
// import {Text, View, Button,  StyleSheet} from 'react-native';



// const StartGameScreen = props => {};


// const styles = StyleSheet.create({});

// export default StartGameScreen;