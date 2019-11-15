import React from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import BodyText from '../components/BodyText';
import Titletext from '../components/titleText';
import Colors from '../constans/color';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.container}>
            <Titletext >
                Gra została ukończona !
            </Titletext>
            <View style={styles.ImagecCntainer}>
                <Image
                    fadeDuration={300}
                    // source={require('../assets/success.png')}
                    source={{ uri: 'https://images.unsplash.com/photo-1551127076-157d9b939bc9?ixlib=rb-1.2.1&w=1000&q=80' }}
                    style={styles.image}
                    resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Twój telefon potrzebował
                    <Text style={styles.highlight}> {props.roundsNumber} </Text>
                    rund, aby zgadnąć numer <Text style={styles.highlight}>{props.searchNumber} </Text> 
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>Nowa gra</MainButton>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ImagecCntainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    }
});

export default GameOverScreen;