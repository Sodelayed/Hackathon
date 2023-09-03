// timer.module.js
import {Module} from '../core/module'
export class TimerModule extends Module {
    constructor() {
        super('timer', 'Timer обратного отсчета');
    }

    trigger() {
        const time = prompt('Введите время в секундах:', '10');
        if (time && !isNaN(time)) {
            this.createTimer(Number(time));
        }
    }

    createTimer(seconds) {
        const timerBox = document.createElement('div');
        timerBox.style.position = 'fixed';
        timerBox.style.bottom = '10px';
        timerBox.style.right = '10px';
        timerBox.style.padding = '5px 10px';
        timerBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        timerBox.style.color = 'white';
        timerBox.style.borderRadius = '5px';
        timerBox.innerText = seconds;

        document.body.appendChild(timerBox);

        const interval = setInterval(() => {
            seconds--;
            timerBox.innerText = seconds;
            if (seconds === 0) {
                clearInterval(interval);
                alert('Таймер завершился!');
                document.body.removeChild(timerBox);
            }
        }, 1000);
       
    }
}