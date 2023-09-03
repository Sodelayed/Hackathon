// background.module.js
import { Module } from '../core/module'
import { random } from "../utils"
// Определение нового модуля "BackgroundModule", который наследуется от базового модуля
export class BackgroundModule extends Module {

    // Конструктор для этого модуля
    constructor() {
        // Вызов конструктора базового класса с типом 'background' и текстом 'Случайный фон'
        super('background', 'Случайный фон')
    }

    // Метод для активации функционала модуля
    trigger() {
        welcome.classList.remove('d-none')
        // Изменение фонового цвета документа на случайный цвет
        // Генерация случайного цвета в формате HEX
        // document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}` //backgroundColor
        const randomColor = `#${random(0, 16777215).toString(16).padStart(6, '0')}`
        document.body.style.backgroundColor = randomColor

    }

    // Метод добавления элемента меню на основе экземпляра модуля
    add(moduleInstance) {
        // Создание нового div элемента
        const menuItem = document.createElement('div')

        // Заполнение элемента HTML-кодом на основе метода toHTML() переданного экземпляра модуля
        menuItem.innerHTML = moduleInstance.toHTML()

        // Получение первого дочернего элемента созданного элемента
        const liElement = menuItem.firstElementChild

        // Добавление слушателя события на клик
        liElement.addEventListener('click', () => {
            // При клике активируем функционал переданного экземпляра модуля
            moduleInstance.trigger()

            // Закрытие
            this.close()
        });

        // Добавление созданного элемента меню в текущий элемент
        this.el.appendChild(liElement)
    }
}