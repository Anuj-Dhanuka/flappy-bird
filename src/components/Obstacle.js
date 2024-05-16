import Matter from 'matter-js'
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Obstacle = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody/2
    const yBody = props.body.position.y - heightBody/2

    const color = props.color;
    const renderPosition = props.renderPosition

    return (
        <View style={{
            position: "absolute",
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            backgroundColor: "green"
        }} > 
        </View>
    )
}

export default (world, label, color, pos, size, renderPosition) => {
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
    renderer: <Obstacle/>
  }
}

const styles = StyleSheet.create({
    image: (heightBody, widthBody) => ({
        height: heightBody,
        width: widthBody,
    })
})