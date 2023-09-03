// Snake Game
import {Module} from '../core/module'
import { setBackgroundImage } from '../utils'
import { addGameInContainerGames } from '../utils'

export class SnakeGame extends Module {
  constructor() {
    super('snake', 'Змейка') 
  }
  
  trigger() {
    // Create html (Прописать HTML)
    const snakeGame = document.createElement('div')
    snakeGame.setAttribute('id', 'snake-game')
    snakeGame.style.position = 'absolute'
    snakeGame.style.left = '0'
    snakeGame.style.right = '0'
    snakeGame.style.top = '0'
    snakeGame.style.bottom = '0'
    snakeGame.style.width = '100%'
    snakeGame.style.height = '100%'
    snakeGame.style.display = 'flex'
    snakeGame.style.justifyContent = 'center'
    snakeGame.style.alignItems = 'center'

    const previewHTML = document.createElement('div')
    previewHTML.setAttribute('id', 'preview')

    const previewImage = document.createElement('img')
    previewImage.src = '../public/snakeGif.gif'
    previewImage.alt = 'WOOOOOOOOOOOOOOOOOOOW'
    previewImage.style.display= 'block'
    previewImage.style.marginLeft= 'auto'
    previewImage.style.marginRight= 'auto'

    const startGameButtonContainer = document.createElement('div')
    startGameButtonContainer.className = 'start'
    startGameButtonContainer.style.display = 'flex'
    startGameButtonContainer.style.justifyContent = 'center'
    startGameButtonContainer.style.alignItems = 'center'

    const startGameButton = document.createElement('button')
    startGameButton.className = 'start'
    startGameButton.innerText = 'Start Game'
    startGameButton.style.fontFamily = 'Super Mario'
    startGameButton.style.color = 'white'
    startGameButton.style.fontWeight = '100'
    startGameButton.style.fontSize = 'xx-large'
    startGameButton.style.backgroundColor = '#4caf50'
    startGameButton.style.width = '320px'
    startGameButton.style.height = '75px'
    startGameButton.style.cursor = 'pointer'

    const gameBoardHTML = document.createElement('div')
    gameBoardHTML.setAttribute('id', 'game-board')

    setBackgroundImage('./public/snakeBackground.png')
    addGameInContainerGames(snakeGame)
    snakeGame.append(previewHTML)
    snakeGame.append(gameBoardHTML)
    previewHTML.append(previewImage)
    previewHTML.append(startGameButtonContainer)
    startGameButtonContainer.append(startGameButton)

    const gameBoard = document.querySelector('#game-board')
    const preview = document.querySelector('#preview')
    const endGameDiv = document.querySelector('#snake-game')

    // Grid (Создание поля для игры)
    const GRID_SIZE = 21

    function randomGridPosition() {
      return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1,
      }
    }

    function outsideGrid(position) {
      return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
      )
    }

    // Snake (Создания змеи)
    const SNAKE_SPEED = 7
    const snakeBody = [{ x: 11, y: 11 }]
    let newSegments = 0

    function updateSnake() {
      addSegments()

      const inputDirection = getInputDirection()
      for (let i = snakeBody.length - 2;i >= 0;i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
      }

      snakeBody[0].x += inputDirection.x
      snakeBody[0].y += inputDirection.y
    } 

    function drawSnake(gameBoard) {
      snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        snakeElement.style.backgroundColor = 'hsl(113, 91%, 41%)'
        snakeElement.style.border = '.25vmin solid black'
        gameBoard.appendChild(snakeElement)
      })
    }

    function expandSnake(amount) {
      newSegments += amount
    }

    function onSnake(position, { ignoreHead = false } = {}) {
      return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) {
          return false
        }
        return equalPositions(segment, position) 
      })
    }

    function getSnakeHead() {
      return snakeBody[0]
    }

    function snakeIntersection() {
      return onSnake(snakeBody[0], { ignoreHead: true })
    }

    function equalPositions(pos1, pos2) {
      return pos1.x === pos2.x && pos1.y === pos2.y 
    } 

    function addSegments() {
      for (let i = 0 ; i < newSegments ; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] }) 
      } 

      newSegments = 0 
    } 

    // Food (Создание еды для змеи)
    let food = getRandomFoodPosition() 
    const EXPANSION_RATE = 1 

    function updateFood() {
      if (onSnake(food)) {
        expandSnake(EXPANSION_RATE) 
        food = getRandomFoodPosition() 
      } 
    } 

    function drawFood(gameBoard) {
      const foodElement = document.createElement('div') 
      foodElement.style.gridRowStart = food.y 
      foodElement.style.gridColumnStart = food.x 
      foodElement.style.backgroundImage = "url('../public/meat.png')" 
      foodElement.classList.add('food') 
      gameBoard.appendChild(foodElement) 
    } 

    function getRandomFoodPosition() {
      let newFoodPosition 
      while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition() 
      } 
      return newFoodPosition 
    } 
    // Game (Инициализация самой игры)
    let lastRenderTime = 0 
    let gameOver = false 

    function openGame () {
      document.body.style.height = '100vh' 
      document.body.style.width = '100vw' 
      document.body.style.display = 'flex' 
      document.body.style.justifyContent = 'center' 
      document.body.style.alignItems = 'center' 
      document.body.style.margin = '0' 
      
      gameBoard.style.backgroundColor = 'black' 
      gameBoard.style.width = '100vmin' 
      gameBoard.style.height = '100vmin' 
      gameBoard.style.display = 'grid' 
      gameBoard.style.gridTemplateRows = 'repeat(21, 1fr)' 
      gameBoard.style.gridTemplateColumns = 'repeat(21, 1fr)' 

      preview.remove() 
    } 

    function startGame(event) {
      const { target } = event 
      if (target.className === 'start') {
        openGame() 
      } 
    } 

    function endGame() {
      gameBoard.remove() 
      preview.remove() 
      const gameOverImage = document.createElement('img') 
      gameOverImage.src = 'https://64.media.tumblr.com/2deedd5c3b2a6117c766f927c2f27fef/tumblr_o0rbtr3mv51uzae1ko1_500.gifv' 
      gameOverImage.style.display= 'block' 
      gameOverImage.style.marginLeft= 'auto' 
      gameOverImage.style.marginRight= 'auto' 
      endGameDiv.append(gameOverImage) 
    } 

    function main(currentTime) {
      if (gameOver) {
        endGame() 
        return
      } 
      window.requestAnimationFrame(main) 
      const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 
      if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
        return
      } 
      lastRenderTime = currentTime 
      update() 
      draw() 
    } 

    window.requestAnimationFrame(main) 

    function update() {
      updateSnake() 
      updateFood() 
      checkDeath() 
    } 

    function draw() {
      gameBoard.innerHTML = '' 
      drawSnake(gameBoard) 
      drawFood(gameBoard) 
    } 

    function checkDeath() {
      gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() 
    } 

    preview.addEventListener('click', startGame) 

    // Input (Прописание контроля игры)
    let inputDirection = { x: 0, y: 0 } 
    let lastInputDirection = { x: 0, y: 0 } 

    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowUp':
          if (lastInputDirection.y !== 0) break
          inputDirection = { x: 0, y: -1 }
          break
        case 'ArrowDown':
          if (lastInputDirection.y !== 0) break
          inputDirection = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
          if (lastInputDirection.x !== 0) break
          inputDirection = { x: -1, y: 0 }
          break
        case 'ArrowRight':
          if (lastInputDirection.x !== 0) break
          inputDirection = { x: 1, y: 0 }
          break
      } 
    }) 

    function getInputDirection() {
      lastInputDirection = inputDirection 
      return inputDirection 
    } 
  } 
}