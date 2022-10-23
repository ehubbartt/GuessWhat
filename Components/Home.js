import React, { useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";

import CustomButton from "./CustomButton";

import { useGameContext } from "../Context/GameContext";

const Home = ({ navigation }) => {
  const { curCategory, handleCategoryPress } = useGameContext();

  const handleStartGame = () => {
    navigation.navigate("Game");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CustomButton
        title="Start Game"
        onPress={handleStartGame}
        isFilled={true}
        style={{ marginBottom: 20, width: "70%", height: 60 }}
      />

      <CustomButton
        title={curCategory.title}
        onPress={handleCategoryPress}
        isFilled={false}
        style={{ marginBottom: 20, width: "70%", height: 60 }}
      />
    </View>
  );
};

export default Home;
