import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import CustomButton from "./CustomButton";
import Dialog from "react-native-dialog";

import { useGameContext } from "../Context/GameContext";

const Game = ({ navigation }) => {
  const {
    curCategory,
    showEndGameDialog,
    endGameSession,
    setShowEndGameDialog,
    gameTimer,
    curPhrases,
    endGameRound,
    setCurPhrases,
    startGameRound,
    setCurPhrase,
    curPhrase,
  } = useGameContext();

  const choosePhrase = (prevPhrase) => {
    let tempPhrases = curPhrases;
    if (curPhrases.length === 0) {
      tempPhrases = curCategory.phrases;
    }
    let phrase = tempPhrases[Math.floor(Math.random() * tempPhrases.length)];

    while (phrase === prevPhrase) {
      phrase = tempPhrases[Math.floor(Math.random() * tempPhrases.length)];
    }

    return phrase;
  };

  const handleNextWordPress = () => {
    if (curPhrase === "Press Next to Start") {
      startGameRound();
    }

    const nextWord = choosePhrase(curPhrase);
    setCurPhrases(curPhrases.filter((word) => word !== nextWord));
    setCurPhrase(nextWord);
  };

  const handleContinueGame = () => {
    setShowEndGameDialog(false);
    endGameRound();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.phraseContainer}>
        <Text>{curPhrase}</Text>
      </View>

      <CustomButton
        title="Next Word"
        onPress={handleNextWordPress}
        isFilled={true}
        style={{ marginTop: 40, width: "70%", height: 60 }}
      ></CustomButton>

      <Dialog.Container visible={showEndGameDialog}>
        <Dialog.Title>End Game</Dialog.Title>
        <Dialog.Description>Would you like to end the game?</Dialog.Description>
        <Dialog.Button
          label="End Game"
          onPress={() => {
            endGameSession(navigation);
          }}
        />
        <Dialog.Button label="Continue Playing" onPress={handleContinueGame} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  phraseContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#30324B",
    width: "70%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Game;
