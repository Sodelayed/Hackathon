// click.module.js
import {Module} from '../core/module'

export class ClicksModule extends Module {
    constructor() {
        super('clicks', 'Click Аналитика');  // 'clicks' - тип модуля, 'Click Analytics' - текст для отображения в меню
        this.singleClicks = 0;
        this.doubleClicks = 0;
        this.timer = null;
        this.isTracking = false;
    }

    trigger() {
        if (!this.isTracking) {
            this.startTracking();
            this.timer = setTimeout(() => {
                this.stopTracking();
                this.showStatistics();
                this.resetCounters();
            }, 10000);  // Устанавливаем время отслеживания в 10 секунд, вы можете изменить это значение
        }
    }

    startTracking() {
        this.isTracking = true;
        document.body.addEventListener('click', this.countSingleClicks.bind(this));
        document.body.addEventListener('dblclick', this.countDoubleClicks.bind(this));
    }

    stopTracking() {
        this.isTracking = false;
        document.body.removeEventListener('click', this.countSingleClicks.bind(this));
        document.body.removeEventListener('dblclick', this.countDoubleClicks.bind(this));
    }

    countSingleClicks() {
        this.singleClicks++;
    }

    countDoubleClicks() {
        this.doubleClicks++;
    }

    showStatistics() {
        alert(`Single clicks: ${this.singleClicks}\nDouble clicks: ${this.doubleClicks}`);
    }

    resetCounters() {
        this.singleClicks = 0;
        this.doubleClicks = 0;
    }
}