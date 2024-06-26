import Matter from "matter-js"
import {Dimensions} from "react-native"

//components
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";

//utils
import { getPipeSizePosPair } from "../utils/random";

const windowsHeight = Dimensions.get('window').height
const windowsWidth = Dimensions.get('window').width

export default entities = () => {
    const engine = Matter?.Engine.create({enableSleeping: false})
    let world = engine.world
    world.gravity.y = 0.4;

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowsWidth*0.9)

    return {
        physics: {engine, world},

        Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 40, width: 50}),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'red', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size, "top" ),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'blue', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size, "bottom" ),

        
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'red', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size, "top" ),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'blue', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size, "bottom" ),

        Floor: Floor(world, 'green', {x: windowsWidth/2, y: windowsHeight}, {height: 40, width: windowsWidth}),

    }
}