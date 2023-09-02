// background.module.js
import {Module} from '../core/module'

export class BackgroundModule extends Module {
    constructor() {
        super('background', 'Изменить фон страницы');  // type и text для этого модуля
    }

    trigger() {
        // Здесь реализация изменения фонового цвета
        document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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