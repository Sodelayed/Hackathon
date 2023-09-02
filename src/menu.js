import { Menu } from './core/menu';

import { AsteroidEvasionModule } from "./modules/asteroidEvasion.module" // Импорт модуля игры про астероиды
import { TicTacToeModule } from "./modules/tictactoe.module"
import { SnakeGame } from "./modules/snakeGame"; // Импорт модуля игры Змейка
import { DinoGameModule } from "./modules/dinoGame.module"
export class ContextMenu extends Menu {
  
    constructor(selector) {
        super(selector);
        this.el.style.display = 'none';

        document.body.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.open(event.pageX, event.pageY);
        });
    }

    open(x, y) {
        this.el.style.top = `${y}px`;
        this.el.style.left = `${x}px`;
        this.el.classList.add('open');
        this.el.style.display = 'block';
    }

    close() {
        this.el.classList.remove('open');
        this.el.style.display = 'none';
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

// Создание и инициализация контекстного меню
const contextMenu = new ContextMenu('.menu');
// Создание модуля для изменения фона и добавление его в контекстное меню
const backgroundModule = new BackgroundModule();
contextMenu.add(backgroundModule);
// Создание модуля для подсчета кликов и добавление его в контекстное меню
const clicksModule = new ClicksModule();
contextMenu.add(clicksModule);
// Создание модуля для генерации фигур и добавление его в контекстное меню
const shapeModule = new ShapeModule();
contextMenu.add(shapeModule);
// Создание модуля для таймера и добавление его в контекстное меню
const timerModule = new TimerModule();
contextMenu.add(timerModule);
// Создание модуля для случайного звука и добавление его в контекстное меню
const randomSoundModule = new RandomSoundModule();
contextMenu.add(randomSoundModule);
// Создание модуля для кастомного сообщения и добавление его в контекстное меню
const customMessageModule = new CustomMessageModule();
contextMenu.add(customMessageModule);
// Создание модуля для ракетной команды и добавление его в контекстное меню
const missileCommandModule = new AsteroidEvasionModule();
contextMenu.add(missileCommandModule);

const tictactoeModule = new TicTacToeModule()
contextMenu.add(tictactoeModule)
// Создание модуля для игры Змейка и добавление его в контекстное меню
const snakeGameModule = new SnakeGame();
contextMenu.add(snakeGameModule);

const dinoGameModule = new DinoGameModule()
contextMenu.add(dinoGameModule)