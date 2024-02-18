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

  const moveSnake = () => {
    console.log('moveSnake')
  }

  const createApple = () => {

  }

  const checkCollision = () => {

  }

  const checkappleCollision = () => {

  }

  const gameLoop = () => {

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
