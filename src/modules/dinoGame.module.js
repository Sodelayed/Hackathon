// dinoGame.module.js
import {Module} from '../core/module'

export class DinoGameModule extends Module {
  constructor() {
    super('dinoGame', 'Игра в динозаврика')
  }

  trigger() {
    const world = document.createElement('div')
    world.classList = 'dino-world'
    const scoreEl = document.createElement('div')
    scoreEl.classList = 'dino-score'
    scoreEl.textContent = 0
    const startEl = document.createElement('div')
    startEl.classList = 'dino-start-screen'
    startEl.textContent = 'Нажми на любую кнопку, чтобы начать игру'
    const ground = document.createElement('img')
    ground.className = 'dino-ground'
    ground.src = './public/ground.png'
    const cactus = document.createElement('img')
    cactus.className = 'dino-cactus'
    cactus.src = './public/cactus.png'
    const dino = document.createElement('img')
    dino.className = 'dino-dino'
    dino.src = './public/dino.png'

    // Получаем элементы с помощью JavaScript
    // const dinoWorld = document.querySelector('.dino-world')
    // const dinoScore = document.querySelector('.dino-score')
    // const dinoStartScreen = document.querySelector('.dino-start-screen')
    // const dinoGround = document.querySelector('.dino-ground')
    // const dinoDino = document.querySelector('.dino-dino')
    // const dinoCactus = document.querySelector('.dino-cactus')


    world.style.overflow = 'hidden'
    world.style.position = 'relative'
    world.style.width = '600px'
    world.style.height = '200px'
    world.style.top = '200px'

    startEl.style.position = 'absolute'
    startEl.style.fontSize = '3vmin'
    startEl.style.right = '3vmin'
    startEl.style.top = '1vmin'

    scoreEl.style.position = 'absolute'
    scoreEl.style.fontSize = '2vmin'
    scoreEl.style.top = '50%'
    scoreEl.style.left = '50%'
    scoreEl.style.transform = 'translate(-50%, -50%)'

    ground.style.position = 'absolute'
    ground.style.width = '100%'
    ground.style.bottom = '0'
    ground.style.left = '0'

    dino.style.height = '30%'
    dino.style.left = '5%'
    dino.style.bottom = '0'
    dino.style.position = 'absolute'
    dino.style.transition = 'transform 0.35s ease-in-out'

    cactus.style.position = 'absolute'
    cactus.style.height = '50px'
    cactus.style.bottom = '0'


    world.append(scoreEl, startEl, ground, cactus, dino)
    document.body.append(world)


    let isGameStarted = false
    let isJumping = false
    let score = 0
    let scoreInterval 
    let isGameOver = false
    let cactusPosition = 1000
  
    document.addEventListener('keydown', startGame)
  
    function startGame() {
      if (startEl.style.visibility === 'hidden') {
        startScore()
        moveCactus()
        isGameStarted = true
        document.removeEventListener('keydown', startGame)
      } else {
        startEl.style.visibility = 'hidden'
      }
    }
  
    document.addEventListener('keydown', (event) => {
      if (!isGameStarted && event.key === ' ') {
        startGame()
      } else if (isGameStarted && event.key === ' ' && !isJumping) {
        jump()
      }
    })
  
    function jump() {
      if (!isJumping) {
        isJumping = true
        const jumpHeight = 100
        const jumpDuration = 500
  
        dino.style.transform = `translateY(-${jumpHeight}px)`
  
        setTimeout(() => {
          dino.style.transform = 'translateY(0)'
          isJumping = false
        }, jumpDuration)
      }
    }
  
    function startScore() {
      scoreInterval = setInterval(() => {
        score++
        scoreEl.textContent = `Счет: ${score}`
      }, 1000)
    }
  
    function gameOver() {
      isGameOver = true
      clearInterval(scoreInterval)
      alert(`Ваш счёт: ${score}\nОбновите страницу, чтобы сыграть ещё раз`)
    }
  
    function checkCollision() {
      const dinoRect = dino.getBoundingClientRect()
      const cactusRect = cactus.getBoundingClientRect()
  
      if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top
      ) {
        gameOver()
      }
    }
  
    function moveCactus() {
      if (cactusPosition > -60) {
        cactusPosition -= 8
        cactus.style.left = `${cactusPosition}px`
      } else {
        cactusPosition = 1000
        cactus.style.left = `${cactusPosition}px`
      }
  
      checkCollision()
  
      if (!isGameOver) {
        requestAnimationFrame(moveCactus)
      }
    }
  }

  add(moduleInstance) {
    const menuItem = document.createElement('div');
    menuItem.innerHTML = moduleInstance.toHTML();
    const liElement = menuItem.firstElementChild;

    liElement.addEventListener('click', () => {
        moduleInstance.trigger();
        this.close();
    });

    this.el.appendChild(liElement);
  }
}
