import { Menu } from './core/menu';

import { AsteroidEvasionModule } from "./modules/asteroidEvasion.module" // Импорт модуля игры про астероиды
import { TicTacToeModule } from "./modules/tictactoe.module"
import { SnakeGame } from "./modules/snakeGame.module" // Импорт модуля игры Змейка
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
const contextMenu = new ContextMenu('.menu')

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