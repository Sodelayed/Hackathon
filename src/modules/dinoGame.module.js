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
    const cactus = new Image()
    cactus.className = 'dino-cactus'
    cactus.src = './public/cactus.png'
    const dino = new Image()
    dino.className = 'dino-dino'
    dino.src = './public/dino.png'

    document.body.append(world)
    world.append(scoreEl, startEl, ground, cactus, dino)


    let isGameStarted = false
    let isJumping = false
    let score = 0
    let scoreInterval 
    let isGameOver = false
    let cactusPosition = 1000 

    const dinoImage = new Image();
    dinoImage.src = './public/dino.png'; 
    const cactusImage = new Image();
    cactusImage.src = './public/cactus.png'; 
  
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
