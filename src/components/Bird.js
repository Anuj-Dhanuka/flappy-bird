import Matter from "matter-js";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Bird = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View style={styles.container(color, xBody, yBody, widthBody, heightBody)}>
      <Image source={require("../../assets/gameImages/flappy-bird-image.png")} style={styles.image} />
    </View>
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initialBird);
  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};

const styles = StyleSheet.create({
  container: (color, xBody, yBody, widthBody, heightBody) => ({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: heightBody,
    justifyContent: "center",
    alignItems: "center"
  }),
  image: {
    height: 40,
    width: 55,
  }
  
});
