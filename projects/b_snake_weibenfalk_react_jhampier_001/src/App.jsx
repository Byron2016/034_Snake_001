import './App.css'

import { useState, useRef, useEffect } from 'react'

// hooks
import { useInterval } from './hooks/useInterval'

// constants
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  COLOR_BACKGROUND,
} from './constants/constants'
import { DRAW_HEAD } from './constants/head_constants'
import { DRAW_APPLE } from './constants/apple_constants'
import { DOUBLE_RECTANGLE } from './constants/develop_constants'
import { GAME_LOOP_CONSOL, IS_DEVELOPMENT } from './config'

//components
import { drawBackground } from './components/Background/drawBackground'
import { drawHead } from './components/Snake/drawHead'
import { EyesToDraw } from './components/Snake/drawEyes'
import { drawApple } from './components/Apple/drawApple'
import { drawBody } from './components/Snake/drawBody'

//utils
import { distanceTwoPoints } from './lib/utils'
import drawDoubleRectangle from './components/utils/drawDoubleRectangle'

function App() {
  const canvasRef = useRef(null)
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState([0, -1])
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [rotation, setRotation] = useState([0, 0, 0])

  const startGame = () => {
    // console.log('startGame')
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDir([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
  }

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
  }

  const moveSnake = ({ keyCode }) => {
    //console.log('moveSnake')

    const rotSpeed = 1 + 1 * 10
    let newRotation = [0, 0, 0]

    if (keyCode === 65) {
      //console.clear()
      newRotation = [rotation[0] + 0, rotation[1] + 0, rotation[2] + rotSpeed]
      setRotation(newRotation)
    }

    if (keyCode === 68) {
      newRotation = [rotation[0] + 0, rotation[1] + 0, rotation[2] - rotSpeed]
      setRotation(newRotation)
    }

    if (keyCode === 71) {
      setRotation([0, 0, 0])
    }

    // to ensure that you only press arrow keys on the keyboard
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])
  }

  const createApple = () => {
    const newApple = apple.map((_, i) => {
      return Math.floor((Math.random() * CANVAS_SIZE[i]) / SCALE)
    })

    return newApple
  }

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE + DRAW_HEAD.HEAD_RADIO >= CANVAS_SIZE[0] ||
      piece[0] <= 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] <= 0
    ) {
      return true
    }

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true
    }

    return false
  }

  const checkAppleCollision = (newSnake) => {
    const dist = distanceTwoPoints([newSnake[0][0], newSnake[0][1]], apple)

    if (dist <= DRAW_HEAD.HEAD_RADIO + DRAW_APPLE.APPLE_RADIO) {
      let newApple = createApple()
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple() // 41.59
      }
      setApple(newApple)
      return true
    }

    return false
  }

  const gameLoop = () => {
    // ensure that we do a deep clone
    const snakeCopy = JSON.parse(JSON.stringify(snake))
    IS_DEVELOPMENT &&
      GAME_LOOP_CONSOL &&
      console.log(`01 - gameloop - snakeCopy: ${snakeCopy}`)
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
    IS_DEVELOPMENT &&
      GAME_LOOP_CONSOL &&
      console.log(
        `02 - gameloop - newSnakeHead: ${newSnakeHead} snakeCopy[0][0]: ${snakeCopy[0][0]} snakeCopy[0][1]: ${snakeCopy[0][1]} dir[0]: ${dir[0]} dir[1]: ${dir[1]}`,
      )
    snakeCopy.unshift(newSnakeHead)
    IS_DEVELOPMENT &&
      GAME_LOOP_CONSOL &&
      console.log(`03 - gameloop - snakeCopy unshift: ${snakeCopy}`)

    if (checkCollision(newSnakeHead)) endGame()
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop()
    setSnake(snakeCopy)
  }

  useEffect(() => {
    // It is will triggered when change: snake, apple, gameOver
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Background
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
    drawBackground({ color: COLOR_BACKGROUND[0], ctx })

    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    // Apple
    drawApple({ position: { x: apple[0], y: apple[1] }, ctx })

    // Snake
    drawSnake({ ctx })

    //context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
    //context.fillStyle = 'pink'
    //snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
    //context.fillStyle = 'lightblue'
    //context.fillRect(apple[0], apple[1], 1, 1)
  }, [snake, apple, gameOver, dir, rotation])

  const drawSnake = ({ ctx }) => {
    //SCALE
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    ctx.save()
    ctx.translate(snake[0][0], snake[0][1])
    ctx.rotate(rotation[2] / SCALE)
    ctx.translate(-snake[0][0], -snake[0][1])

    // Snake body
    snake.forEach(([x, y]) => {
      drawBody({ position: { x, y }, ctx })
    })

    // DoubleRectangle
    if (IS_DEVELOPMENT)
      drawDoubleRectangle({
        position: { x: snake[0][0], y: snake[0][1] },
        ctx,
        outSideRectangleColor: DOUBLE_RECTANGLE.DR_OUTSIDE_COLOR,
        inSideRectangleColor: DOUBLE_RECTANGLE.DR_INSIDE_COLOR,
        rectLineWidth: DOUBLE_RECTANGLE.DR_LINE_WIDTH,
        outSideRectangleSide: DOUBLE_RECTANGLE.DR_OUTSIDE_SIDE,
        inSideRectangleSide: DOUBLE_RECTANGLE.DR_INSIDE_SIDE,
        transparency: DOUBLE_RECTANGLE.DR_TRANSPARENCY,
      })

    // Head
    drawHead({ position: { x: snake[0][0], y: snake[0][1] }, ctx })

    //Eyes
    EyesToDraw({
      eye_one_position: { x: snake[0][0], y: snake[0][1] },
      eye_two_position: { x: snake[0][0], y: snake[0][1] },
      ctx,
      dir,
    })

    ctx.restore()
  }

  useInterval(() => gameLoop(), speed)

  return (
    <>
      <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
        <canvas
          style={{ border: '1px solid black' }}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {gameOver && <div>GAME OVER</div>}
        <button onClick={startGame}>Start Game</button>
      </div>
    </>
  )
}

export default App
