import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Components/Home";
import Game from "./Components/Game";

import { GameProvider } from "./Context/GameContext";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

export default App;
