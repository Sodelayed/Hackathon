// click.module.js
import { Module } from '../core/module'

export class FlappyBirdModule extends Module {
  constructor() {
    super('flappyBird', 'Flappy Bird')
  }

  trigger() {
    const flappyBird = document.querySelector('#flappyBird')
    flappyBird.classList.remove('d-none')
    this.start()
  }

  start() {
    const birdMenu = document.querySelector('#birdMenu')
    const btnStartGame = document.querySelector('#btnStartGame')
    const birdCanvas = document.querySelector('#gameCanvas')
    const context = birdCanvas.getContext('2d')

    birdCanvas.width = 288
    birdCanvas.height = 512

    let isStartGame = false

    const bird = document.createElement('img')
    const bg = document.createElement('img')
    const fg = document.createElement('img')
    const pipeUp = document.createElement('img')
    const pipeBottom = document.createElement('img')

    bird.src = './public/images/flappyBird/bird.png'
    bg.src = './public/images/flappyBird/bg.png'
    fg.src = './public/images/flappyBird/fg.png'
    pipeUp.src = './public/images/flappyBird/pipeUp.png'
    pipeBottom.src = './public/images/flappyBird/pipeBottom.png'

    //Звуковое сопровождение
    const fly = document.createElement('audio')
    const scoreAudio = document.createElement('audio')
    const gameOverAudio = document.createElement('audio')

    fly.src = './public/audio/fly.mp3'
    scoreAudio.src = './public/audio/score.mp3'
    gameOverAudio.src = './public/audio/gameOver.mp3'

    //Отступ между трубами
    const GAP = 120

    //Позиция птички
    let xPosBird = 10
    let yPosBird = 150
    const GRAVITATION = 1.5

    //Создание  блоков
    let pipes = [
      {
        x: birdCanvas.width,
        y: 0
      }
    ]

    let score = 0

    function stopGame() {
      isStartGame = false
      gameOverAudio.play()
      birdMenu.classList.remove('d-none')
      score = 0
      xPosBird = 10
      yPosBird = 150
      pipes = [
        {
          x: birdCanvas.width,
          y: 0
        }
      ]
    }

    function startGame() {
      birdCanvas.classList.remove('d-none')
      isStartGame = true
      draw()
    }

    function draw() {
      if (!isStartGame) {
        return
      }

      context.drawImage(bg, 0, 0)

      for (let i = 0; i < pipes.length; i++) {
        context.drawImage(pipeUp, pipes[i].x, pipes[i].y)
        context.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + GAP)

        pipes[i].x--

        if (pipes[i].x === 100) {
          pipes.push({
            x: birdCanvas.width,
            y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
          })

          if (pipes.length > 2) {
            pipes.shift()
          }
        }

        //Отслеживание прикосновений
        if (
          (xPosBird + bird.width >= pipes[i].x &&
            xPosBird <= pipes[i].x + pipeUp.width &&
            (yPosBird <= pipes[i].y + pipeUp.height ||
              yPosBird + bird.height >= pipes[i].y + pipeUp.height + GAP)) ||
          yPosBird + bird.height >= birdCanvas.height - fg.height
        ) {
          stopGame()
        }

        if (pipes[i].x === 5) {
          score++
          scoreAudio.play()
        }
      }

      context.drawImage(fg, 0, birdCanvas.height - fg.height)
      context.drawImage(bird, xPosBird, yPosBird)

      yPosBird += GRAVITATION

      context.fillStyle = '#000'
      context.font = '24px Verdana'
      context.fillText(`Счёт: ${score}`, 10, birdCanvas.height - 20)

      requestAnimationFrame(draw)
    }

    btnStartGame.addEventListener('click', () => {
      birdMenu.classList.add('d-none')
      startGame()
    })

    //Взлет птички
    const JUMP = 30

    function moveUp() {
      yPosBird -= JUMP
      fly.play()
    }

    birdCanvas.addEventListener('click', moveUp)
  }
}
