// costumeMessage.module.js
import { Module } from '../core/module'
import {random} from "../utils";

export class CustomMessageModule extends Module {
    constructor(text) {
        super('customMessage', text || 'Кастомное сообщение')
        // Массив с примерными сообщениями
        this.messages = [
            'Надо на Wildberries сходить',
            'У меня довольный кот',
            'Сегогдня дождь',
            'Я люблю пироженку',
            'Динозавры не летают'
        ]
    }

    trigger() {
        welcome.classList.remove('d-none')
        this.showMessage()
    }

    showMessage() {
        const messageContainer = document.createElement('div')

        // Выбор случайного сообщения из массива
        const randomMessage = this.messages[random(0, this.messages.length - 1)]

        // Установка текста контейнера сообщений в случайное сообщение
        messageContainer.textContent = randomMessage

        messageContainer.style.position = 'fixed'
        messageContainer.style.bottom = '10px'
        messageContainer.style.right = '10px'
        messageContainer.style.backgroundColor = 'rgba(0,0,0,0.8)'
        messageContainer.style.color = 'white'
        messageContainer.style.padding = '10px'
        messageContainer.style.borderRadius = '5px'
        messageContainer.style.zIndex = '10000' // чтобы быть уверенным, что сообщение видно поверх других элементов
        messageContainer.style.transition = 'opacity 1s'

        document.body.appendChild(messageContainer)

        // Удаляем сообщение через 5 секунд (5000 мс)
        setTimeout(() => {
            messageContainer.style.opacity = '0'
            setTimeout(() => {
                document.body.removeChild(messageContainer)
            }, 1000)
        }, 5000)
    }
}