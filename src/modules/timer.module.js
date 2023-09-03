// timer.module.js
import {Module} from '../core/module'

// Определение модуля таймера, который наследует основные функции и свойства класса Module.
export class TimerModule extends Module {

    // Конструктор класса, который устанавливает тип и название для таймера.
    constructor() {
        super('timer', 'Таймер отсчета')
    }

    // Метод, который запускается при активации модуля.
    trigger() {
        welcome.classList.remove('d-none')
        // Запрос у пользователя на ввод времени в секундах.
        const time = prompt('Введите время в секундах:', '10')

        // Если время задано и это число, создаем таймер с этим временем.
        if (time && !isNaN(time)) {
            this.createTimer(Number(time))
        }
    }

    // Метод для создания и отображения таймера на странице.
    createTimer(seconds) {
        // Создание элемента div для отображения таймера.
        const timerBox = document.createElement('div')

        // Установка стилей для таймера.
        timerBox.style.position = 'fixed'
        timerBox.style.bottom = '10px'
        timerBox.style.right = '10px'
        timerBox.style.padding = '5px 10px'
        timerBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        timerBox.style.color = 'white'
        timerBox.style.borderRadius = '5px'
        timerBox.innerText = seconds

        // Добавление элемента таймера на страницу.
        document.body.appendChild(timerBox)

        // Создание интервала, который будет уменьшать значение таймера каждую секунду.
        const interval = setInterval(() => {
            seconds--
            timerBox.innerText = seconds
            // Если таймер достигает 0, останавливаем интервал, показываем уведомление и удаляем таймер со страницы.
            if (seconds === 0) {
                clearInterval(interval)
                alert('Таймер завершился!')
                document.body.removeChild(timerBox)
            }
        }, 1000)
    }
}