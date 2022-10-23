import React, { useState, useContext, useRef, useEffect } from "react";
import { Audio } from "expo-av";

import { categories } from "../Constants/categories";
const GameContext = React.createContext();

const GAME_LENGTH = 45;

const GameProvider = ({ children }) => {
  const [curCategory, setCurCategory] = useState(categories[0]);
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const [gameTimer, setGameTimer] = useState(GAME_LENGTH);
  const [curPhrases, setCurPhrases] = useState(curCategory.phrases);
  const [curPhrase, setCurPhrase] = useState("Press Next to Start");
  const [sound, setSound] = React.useState();

  const gameTimerRef = useRef(null);

  /**
   * will cycle through the categories when pressed
   */
  const handleCategoryPress = () => {
    let index = categories.indexOf(curCategory);
    if (index === categories.length - 1) {
      setCurCategory(categories[0]);
    } else {
      setCurCategory(categories[categories.indexOf(curCategory) + 1]);
    }
  };

  useEffect(() => {
    if (gameTimer === 0) {
      endGameRound();
      setShowEndGameDialog(true);
      playEndGameSound();
    }
  }, [gameTimer]);

  const playEndGameSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/game-end-alarm.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  };

  const startGameRound = async () => {
    let gameTimerInterval = setInterval(() => {
      setGameTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/45-second-clock-ticking.mp3")
    );
    setSound(sound);

    await sound.playAsync();
    gameTimerRef.current = gameTimerInterval;
  };

  const endGameRound = () => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    setGameTimer(GAME_LENGTH);
    setCurPhrase("Press Next to Start");
  };

  const startGameSession = () => {};

  const endGameSession = (navigation) => {
    setShowEndGameDialog(false);
    setCurPhrase("Press Next to Start");
    navigation.navigate("Home");
  };

  return (
    <GameContext.Provider
      value={{
        curCategory,
        handleCategoryPress,
        endGameSession,
        gameTimer,
        startGameRound,
        endGameRound,
        curPhrases,
        setCurPhrases,
        curPhrase,
        setCurPhrase,
        showEndGameDialog,
        setShowEndGameDialog,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};

export { GameContext, GameProvider };
