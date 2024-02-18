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
  DIRECTIONS
} from './constants/constants'
import { GAME_LOOP_CONSOL, IS_DEVELOPMENT } from './config'

function App () {
  const canvasRef = useRef(null)
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState([0, -1])
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const startGame = () => {
    console.log('startGame')
  }

  const endGame = () => {

  }

  const moveSnake = ({ keyCode }) => {
    console.log('moveSnake')
    // to ensure that you only press arrow keys on the keyboard
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode])
  }

  const createApple = () => {

  }

  const checkCollision = () => {

  }

  const checkappleCollision = () => {

  }

  const gameLoop = () => {
    // ensure that we do a deep clone
    const snakeCopy = JSON.parse(JSON.stringify(snake))
    IS_DEVELOPMENT && GAME_LOOP_CONSOL && console.log(`gameloop - snakeCopy: ${snakeCopy}`)
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]
    IS_DEVELOPMENT && GAME_LOOP_CONSOL && console.log(`gameloop - newSnakeHead: ${snake}`)
    snakeCopy.unshift(newSnakeHead)
    IS_DEVELOPMENT && GAME_LOOP_CONSOL && console.log(`gameloop - snakeCopy unshift: ${snakeCopy}`)
    snakeCopy.pop()
    setSnake(snakeCopy)
  }

  useEffect(() => {
    // It is will triggered when change: snake, apple, gameOver
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
    context.fillStyle = 'pink'
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
    context.fillStyle = 'lightblue'
    context.fillRect(apple[0], apple[1], 1, 1)
  }, [snake, apple, gameOver])

  useInterval(() => gameLoop(), speed)

  return (
    <>
      <div role='button' tabIndex='0' onKeyDown={e => moveSnake(e)}>
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
