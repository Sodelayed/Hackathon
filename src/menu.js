// Импорт необходимых модулей и классов
import { Menu } from './core/menu'
import { BackgroundModule } from './modules/background.module' // Импорт модуля для смены фона
import { ClicksModule } from './modules/click.module' // Импорт модуля для подсчета кликов
import { ShapeModule } from './modules/shape.module' // Импорт модуля для отрисовки фигур
import { TimerModule } from './modules/timer.module' // Импорт модуля для отсчета времени
import { RandomSoundModule } from './modules/sound.module' // Импорт модуля для воспроизведения звуков
import { CustomMessageModule } from './modules/customMessage.module' // Импорт модуля для вывода сообщений
import { AsteroidEvasionModule } from "./modules/asteroidEvasion.module" // Импорт модуля игры астеройд
import { TicTacToeModule } from './modules/tictactoe.module' // Импорт модуля игры крестики-нолики
import { SnakeGame } from './modules/snakeGame.module' // Импорт модуля игры Змейка
import { DinoGameModule } from './modules/dinoGame.module' // Импорт модуля игры Дино
import { FlappyBirdModule } from './modules/flappyBird.module'
import { setBackgroundColor } from './utils'
import { cleanerContainerGames } from './utils'

export class ContextMenu extends Menu {
  
    constructor(selector) {
        super(selector)  // Вызов конструктора родительского класса
        this.el.style.display = 'none'  // Изначально меню скрыто

        document.body.addEventListener('contextmenu', (event) => {
            event.preventDefault()  // Предотвращаем стандартное поведение контекстного меню
            this.open(event.pageX, event.pageY)  // Открываем наше контекстное меню
        })
    }
    

    open(x, y) {
        this.el.style.top = `${y}px`
        this.el.style.left = `${x}px`
        this.el.classList.add('open')  // Добавляем класс для отображения меню
        this.el.style.display = 'block'
    }

    close() {
        this.el.classList.remove('open')
        this.el.style.display = 'none'
    }

    add(moduleInstance) {
        const menuItem = document.createElement('div')
        menuItem.innerHTML = moduleInstance.toHTML()
        const liElement = menuItem.firstElementChild

        liElement.addEventListener('click', () => {
            cleanerContainerGames()
            setBackgroundColor('#fff')
            moduleInstance.trigger()
            this.close()
        });

        this.el.appendChild(liElement);
    }
}
const contextMenu = new ContextMenu('.menu')

// Инициализация и добавление различных модулей в контекстное меню

const missileCommandModule = new AsteroidEvasionModule();
contextMenu.add(missileCommandModule);

const tictactoeModule = new TicTacToeModule()
contextMenu.add(tictactoeModule)

const snakeGameModule = new SnakeGame();
contextMenu.add(snakeGameModule);

const dinoGameModule = new DinoGameModule()
contextMenu.add(dinoGameModule);

const flappyBirdModule = new FlappyBirdModule()
contextMenu.add(flappyBirdModule)

const hr = document.createElement('hr')
const ul = document.querySelector('.menu')
ul.append(hr)

const backgroundModule = new BackgroundModule()
contextMenu.add(backgroundModule)

const clicksModule = new ClicksModule()
contextMenu.add(clicksModule)

const shapeModule = new ShapeModule()
contextMenu.add(shapeModule)

const timerModule = new TimerModule()
contextMenu.add(timerModule)

const randomSoundModule = new RandomSoundModule()
contextMenu.add(randomSoundModule)

const customMessageModule = new CustomMessageModule()
contextMenu.add(customMessageModule)