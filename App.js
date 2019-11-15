import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() { 

  const [userNumber, setUserNumber] = useState();
  const [NumberRounds, setNumberRounds] = useState(0);
  const [dataLoaded, setdataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setdataLoaded(true)}
        onError={(e) => { console.log(e) }}
      />);
  }

  const configureNewGameHandler = () => {
    setNumberRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  const gameOverHandler = numOfRounds => {
    setNumberRounds(numOfRounds);
  };

  if (userNumber && NumberRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (NumberRounds > 0) {
    content = <GameOverScreen roundsNumber={NumberRounds} searchNumber={userNumber} onRestart={configureNewGameHandler} />
  }


  return (
    <View style={styles.screen}>
      <Header title="Zgadnij numer" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
