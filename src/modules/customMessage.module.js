// costumeMessage.module.js
import { Module } from '../core/module'
export class CustomMessageModule extends Module {
    constructor(text) {
        super('customMessage', text || 'Кастомное сообщение');
    }

    trigger() {
        this.showMessage();
    }

    showMessage() {
        const messageContainer = document.createElement('div');
        messageContainer.textContent = this.text;
        messageContainer.style.position = 'fixed';
        messageContainer.style.bottom = '10px';
        messageContainer.style.right = '10px';
        messageContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
        messageContainer.style.color = 'white';
        messageContainer.style.padding = '10px';
        messageContainer.style.borderRadius = '5px';
        messageContainer.style.zIndex = '10000'; // чтобы быть уверенным, что сообщение видно поверх других элементов
        messageContainer.style.transition = 'opacity 1s';

        document.body.appendChild(messageContainer);

        // Удаляем сообщение через 5 секунд (5000 мс)
        setTimeout(() => {
            messageContainer.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageContainer);
            }, 1000);
        }, 5000);
    }
}