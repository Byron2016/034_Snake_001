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
  COLOR_BACKGROUND,
  ROTATION_SPEED,
  SNAKE_START_POSITION,
} from './constants/constants'
import { DRAW_HEAD } from './constants/head_constants'
import { DRAW_BODY } from './constants/body_constants'
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
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [rotation, setRotation] = useState([0, 0, 0])
  const [keys, setKeys] = useState({ key1: false, key2: false })

  const startGame = () => {
    // console.log('startGame')
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    initBody()
    setSpeed(SPEED)
    setGameOver(false)
    setRotation([0, 0, 0])
  }

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
  }

  const moveSnake = ({ keyCode }) => {
    //console.log(`moveSnake: ${keyCode}`)

    const newKeys = { ...keys }

    if (keyCode === 65 || keyCode === 97) {
      //a A
      newKeys.key1 = true
      setKeys(newKeys)
    }

    if (keyCode === 68 || keyCode === 100) {
      //d DD
      newKeys.key2 = true
      setKeys(newKeys)
    }

    if (keyCode === 70) {
      //E
      endGame()
    }

    if (keyCode === 71) {
      setRotation([0, 0, 0])
    }

    if (keyCode === 83) {
      //S
      console.clear()
      startGame()
    }

    if (keyCode === 70) {
      //F
      if (speed === null) {
        setSpeed(SPEED)
      } else {
        setSpeed(null)
      }
    }

    // to ensure that you only press arrow keys on the keyboard
    // keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])
  }

  const moveSnakeUp = ({ keyCode }) => {
    const newKeys = { ...keys }

    if (keyCode === 65 || keyCode === 97) {
      newKeys.key1 = false
      setKeys(newKeys)
    }
    if (keyCode === 68 || keyCode === 100) {
      newKeys.key2 = false
      setKeys(newKeys)
    }
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
      if (piece[0] === segment[0] && piece[1] === segment[1]) {
        return true
      }
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

  const update = () => {
    //console.log(`update`)
    const ang = (ROTATION_SPEED * Math.PI) / 180 // Math.PI / 2.1
    let newAngle = 0
    let newRotation = [0, 0, 0]

    if (keys.key1) {
      newAngle = rotation[2] - ang

      if (newAngle >= 2 * Math.PI || newAngle <= -2 * Math.PI) {
        newAngle = newAngle + 2 * Math.PI
      }
      newRotation = [rotation[0] + 0, rotation[1] + 0, newAngle]
      setRotation(newRotation)

      newRotation = [rotation[0] + 0, rotation[1] + 0, newAngle]
      setRotation(newRotation)
    }

    if (keys.key2) {
      newAngle = rotation[2] + ang

      if (newAngle >= 2 * Math.PI || newAngle <= -2 * Math.PI) {
        newAngle = newAngle - 2 * Math.PI
      }
      newRotation = [rotation[0] + 0, rotation[1] + 0, newAngle]
      setRotation(newRotation)

      newRotation = [rotation[0] + 0, rotation[1] + 0, newAngle]
      setRotation(newRotation)
    }
  }

  const initBody = () => {
    let newSnake = []
    for (let i = 0; i < DRAW_BODY.BODY_INITIAL_ELEMENTS; i++) {
      let path = []
      for (let k = 0; k < DRAW_BODY.BODY_PATH_ELEMENTS; k++) {
        path.push([SNAKE_START_POSITION[0][0], SNAKE_START_POSITION[0][1]])
      }
      newSnake.push([0, 0, []])

      newSnake[i][0] = SNAKE_START_POSITION[0][0]
      newSnake[i][1] = SNAKE_START_POSITION[0][1]
      newSnake[i][2].push(...path)
    }
    setSnake([...newSnake])
    // if (!gameStart) {
    //   for (let i = 1; i < 3; i++) {
    //     DRAW_BODY.BODY_PATH[i][DRAW_BODY.BODY_PATH[1].length - 1].x =
    //       snake[i][0]
    //     DRAW_BODY.BODY_PATH[i][DRAW_BODY.BODY_PATH[1].length - 1].y =
    //       snake[i][1]
    //   }
    // }
  }

  const gameLoop = () => {
    //console.log(`gameLoop - ${snake.length}`)
    update()

    // ensure that we do a deep clone
    const snakeCopy = JSON.parse(JSON.stringify(snake))

    // IS_DEVELOPMENT &&
    //   GAME_LOOP_CONSOL &&
    //   console.log(`01 - gameloop - snakeCopy: ${snakeCopy}`)

    const divisor = 11.9

    let desp_x = Math.round((Math.cos(rotation[2]) / divisor) * 1000) / 1000
    let desp_y = Math.round((Math.sin(rotation[2]) / divisor) * 1000) / 1000

    desp_x = Math.round((snakeCopy[0][0] + desp_x) * 1000) / 1000
    desp_y = Math.round((snakeCopy[0][1] + desp_y) * 1000) / 1000

    const newSnakeHead = [desp_x, desp_y]
    snakeCopy[0][0] = newSnakeHead[0]
    snakeCopy[0][1] = newSnakeHead[1]
    snakeCopy[0][2].unshift(newSnakeHead)

    // IS_DEVELOPMENT &&
    //   GAME_LOOP_CONSOL &&
    //   console.log(
    //     `02 - gameloop - newSnakeHead: ${newSnakeHead} snakeCopy[0][0]: ${snakeCopy[0][0]} snakeCopy[0][1]: ${snakeCopy[0][1]} dir[0]: ${dir[0]} dir[1]: ${dir[1]}`,
    //   )

    // IS_DEVELOPMENT &&
    //   GAME_LOOP_CONSOL &&
    //   console.log(`03 - gameloop - snakeCopy unshift: ${snakeCopy}`)

    for (let i = 1; i < snakeCopy.length; i++) {
      // delete last element from path and return it tu add next path.
      const a = snakeCopy[i - 1][2].pop()
      snakeCopy[i][2].unshift(a)
    }

    snakeCopy[snakeCopy.length - 1][2].pop()

    if (checkCollision(newSnakeHead)) endGame()
    if (!checkAppleCollision(snakeCopy)) {
      //snakeCopy.pop()
    }

    setSnake(snakeCopy)
  }

  useEffect(() => {
    initBody()
  }, [])

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
    if (snake.length !== 0) drawSnake({ ctx })
  }, [snake, apple, gameOver, rotation])

  const drawSnake = ({ ctx }) => {
    // Snake body
    snake.forEach((bodyPath) => {
      const bodyPartToDraw = bodyPath[2].slice(-1)
      const newPosition = { x: bodyPartToDraw[0][0], y: bodyPartToDraw[0][1] }

      drawBody({ position: newPosition, ctx })
    })

    //SCALE
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    ctx.save()
    ctx.translate(snake[0][0], snake[0][1])
    ctx.rotate(rotation[2])
    //ctx.rotate(Math.PI / 2)
    ctx.translate(-snake[0][0], -snake[0][1])

    // Head
    drawHead({ position: { x: snake[0][0], y: snake[0][1] }, ctx })

    //Eyes
    EyesToDraw({
      eye_one_position: { x: snake[0][0], y: snake[0][1] },
      eye_two_position: { x: snake[0][0], y: snake[0][1] },
      ctx,
    })

    ctx.restore()

    // DoubleRectangle
    if (IS_DEVELOPMENT) {
      ctx.save()
      ctx.translate(snake[0][0], snake[0][1])
      ctx.rotate(rotation[2])
      //ctx.rotate(0)
      ctx.translate(-snake[0][0], -snake[0][1])
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
      ctx.restore()
    }
  }

  useInterval(() => gameLoop(), speed)

  function handleAngleChange(e) {
    const angG = e.target.value
    const angR = (angG * Math.PI) / 180
    setRotation([0, 0, angR])
  }

  function handleSpeedChange(e) {
    setSpeed(e.target.value)
  }

  return (
    <>
      <div
        role="button"
        tabIndex="0"
        onKeyDown={(e) => moveSnake(e)}
        onKeyUp={(e) => moveSnakeUp(e)}
      >
        <canvas
          style={{ border: '1px solid black' }}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {gameOver && (
          <div style={{ padding: '10px', color: 'red' }}>GAME OVER</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={startGame}>Start Game</button>
          {IS_DEVELOPMENT && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="AngleContainer">
                <span style={{ color: 'red' }}>Angle</span>
                <div className="InputRange__display">
                  <input
                    type="range"
                    id="angule"
                    name="angle"
                    min="-360"
                    max="360"
                    step=".5"
                    value={
                      Math.round(((rotation[2] * 180) / Math.PI) * 1000) / 1000
                    }
                    onChange={handleAngleChange}
                  />
                  <div>
                    <span>
                      {Math.round(((rotation[2] * 180) / Math.PI) * 1000) /
                        1000}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'red' }}>Speed</span>
                <div className="InputRange__display">
                  <input
                    type="range"
                    id="speed"
                    name="speed"
                    min="0"
                    max="1000"
                    value={speed === null || speed === 0 ? 0 : speed}
                    onChange={handleSpeedChange}
                  />
                  <div>
                    <span>{speed}</span>
                  </div>
                </div>
              </div>

              <div className="devOpsKeys">
                <button onClick={() => setSpeed(SPEED)}>Game Again</button>
                <div className="keyPressed">
                  <span style={{ color: 'red' }}>Key pressed</span>
                  <div className="keyPressed__elements">
                    <span>{` A: ${!keys.key1 ? 'False' : 'True'}`}</span>
                    <span>{' / '}</span>
                    <span>{` D: ${!keys.key2 ? 'False' : 'True'}`}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
