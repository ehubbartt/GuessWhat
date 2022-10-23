import React from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, title, isFilled, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        isFilled ? styles.filledButtonContainer : styles.hollowButtonContainer,
        style,
      ]}
    >
      <Text
        style={isFilled ? styles.filledButtonText : styles.hollowButtonText}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filledButtonContainer: {
    elevation: 8,
    backgroundColor: "#22BFAC",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filledButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  hollowButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#FF8D5C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hollowButtonText: {
    fontSize: 18,
    color: "#FF8D5C",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default CustomButton;
