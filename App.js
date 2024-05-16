import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./src/entities";
import Physics from "./src/physics";
import { useEffect, useState } from "react";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(true);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        entities={entities()}
        systems={[Physics]}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              
              break;
            case "new_point":
              setCurrentPoints((points) => points + 1);
              break;
          }
        }}
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>
      {!running ? (
        <View style={styles.failContainer}>
          <Image source={require("./assets/gameImages/crash.png")} style={styles.image} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRunning(true);
              setCurrentPoints(0);
              gameEngine.swap(entities())
            }}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
  },
  failContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
  image: {
    height: 100,
    width: 150,
    marginBottom: 20,
  }
});
