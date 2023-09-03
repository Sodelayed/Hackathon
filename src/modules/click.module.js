// click.module.js
import {Module} from '../core/module'

// Класс для отслеживания и анализа кликов мышью.
export class ClicksModule extends Module {
    constructor() {
        // Вызов конструктора родительского класса
        super('clicks', 'Аналитика кликов')

        // Инициализация счетчиков кликов
        this.singleClicks = 0
        this.doubleClicks = 0

        this.timer = null  // Пока не используется
        this.isTracking = false  // Флаг для проверки активности отслеживания

        // Инициализация времени для обратного отсчета
        this.timeLeft = 3000  // Время для обратного отсчета в мс
        this.interval = null  // Интервал для обратного отсчета

        this.boundCountSingleClicks = this.countSingleClicks.bind(this)
        this.boundCountDoubleClicks = this.countDoubleClicks.bind(this)
    }

    // Метод активации модуля
    trigger() {
        welcome.classList.remove('d-none')
        // Если отслеживание не активно
        if (!this.isTracking) {
            this.createStatElement()  // Создать элемент для отображения статистики
            this.startTracking()  // Начать отслеживание кликов

            // Запуск интервала для обратного отсчета
            this.interval = setInterval(() => {
                this.timeLeft -= 1000  // Уменьшаем время на 1 секунду
                this.updateStatElement()  // Обновляем элемент со статистикой

                // Если время вышло
                if (this.timeLeft <= 0) {
                    clearInterval(this.interval)  // Остановить интервал
                    this.stopTracking()  // Остановить отслеживание
                    this.showStatistics()  // Показать результаты
                    this.resetCounters()  // Сбросить счетчики
                }
            }, 1000)
        }
    }

    // Создание элемента для отображения статистики
    createStatElement() {
        this.statElement = document.createElement('div')

        // Применение стилей к элементу
        this.statElement.style.position = 'fixed'
        this.statElement.style.top = '30%'
        this.statElement.style.left = '50%'
        this.statElement.style.transform = 'translate(-50%, -50%)'
        this.statElement.style.background = '#000'
        this.statElement.style.color = '#fff'
        this.statElement.style.padding = '10px'
        this.statElement.style.borderRadius = '5px'

        // Добавление элемента к body
        document.body.appendChild(this.statElement)
        this.updateStatElement()
    }

    // Обновление содержимого элемента статистики
    updateStatElement() {
        this.statElement.innerHTML = `
            Single Clicks: ${this.singleClicks} <br>
            Double Clicks: ${this.doubleClicks} <br>
            Time left: ${this.timeLeft / 1000} seconds
        `
    }

    // Удаление элемента статистики
    removeStatElement() {
        document.body.removeChild(this.statElement)
        this.statElement = null
    }

    // Начало отслеживания кликов
    startTracking() {
        this.isTracking = true

        // Добавление слушателей событий для кликов
        document.body.addEventListener('click', this.boundCountSingleClicks)
        document.body.addEventListener('dblclick', this.boundCountDoubleClicks)
    }

    // Остановка отслеживания кликов
    stopTracking() {
        this.isTracking = false

        // Удаление слушателей событий
        document.body.removeEventListener('click', this.boundCountSingleClicks)
        document.body.removeEventListener('dblclick', this.boundCountDoubleClicks)

        this.removeStatElement()
    }

    // Обработчик одиночных кликов
    countSingleClicks() {
        this.singleClicks++
        this.updateStatElement()
    }

    // Обработчик двойных кликов
    countDoubleClicks() {
        this.doubleClicks++
        this.updateStatElement()
    }

    // Показать результаты в модальном окне
    showStatistics() {
        alert(`Single clicks: ${this.singleClicks}\nDouble clicks: ${this.doubleClicks}`)
    }

    // Сброс счетчиков
    resetCounters() {
        this.singleClicks = 0
        this.doubleClicks = 0
        this.timeLeft = 3000
    }
}