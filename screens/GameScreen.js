import React, { useState, useRef, useEffect } from 'react';
import { View, Alert, ScrollView, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }
};

// const renderListItem = (value, numOfRounds) => (
//     <View key={value} style={styles.listItem}>
//         <BodyText>#{numOfRounds}</BodyText>
//         <BodyText>{value}</BodyText>
//     </View>);

const renderListItem = (listLength, itemData) => (
    <View  style={styles.listItem}>
        <BodyText>#{listLength - itemData.index }</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>);

const GameScreen = props => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);


    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {

        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Nie kłam!', 'Wiesz że jest to niepoprawana odpowiedź...', [{ text: 'Przepraszam !', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1 );
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <BodyText style={styles.title}>
                Przeciwnik zgaduje
            </BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonConatainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}> <Ionicons name="md-remove" size={24} color="white" /> </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>  <Ionicons name="md-add" size={24} color="white" /> </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list} >
                    {pastGuesses.map( (guess, index )=> renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                keyExtractor={(item) => item} 
                data={pastGuesses} 
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonConatainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 300,
        maxWidth: '90%',
        paddingTop: 20
    },
    title: {
        marginVertical: 10,
        fontSize: 18,
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
       // alignItems: 'center',
        justifyContent: 'flex-end' 
    },
    listItem: {
        borderColor: 'black',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default GameScreen;