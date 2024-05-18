import Matter from 'matter-js'
import React from 'react'
import { View, StyleSheet } from 'react-native'

const ObstacleComponent = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    return (
        <View style={styles.container(xBody, yBody, widthBody, heightBody)} > 
        </View>
    )
}

export default Obstacle = (world, label, color, pos, size, renderPosition) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label, isStatic: true}
  )
  Matter.World.add(world, initialObstacle)
  return {
    body: initialObstacle,
    color,
    pos,
    renderPosition,
    renderer: <ObstacleComponent/>
  }
}

const styles = StyleSheet.create({
    container: (xBody, yBody, widthBody, heightBody) => ({
      position: "absolute",
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
      backgroundColor: "green"
    })
})