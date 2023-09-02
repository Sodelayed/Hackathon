// sound.module.js
import { Module } from '../core/module'
export class RandomSoundModule extends Module {
    constructor() {
        super('randomSound', 'Случайный звук');
    }

    trigger() {
        this.playRandomSound();
    }

    playRandomSound() {
        // Список URL-адресов звуков (пока мы используем только звуковые оповещения для простоты)
        const sounds = [
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_038.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_037.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_036.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_035.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_034.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_033.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_032.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_031.mp3',
            'https://aparkov.ru/wp-content/uploads/sound_effects/33_jumor/jumor_030.mp3',
        ];

        // Выбираем случайный звук из списка
        const soundURL = sounds[Math.floor(Math.random() * sounds.length)];

        // Создаем аудио объект и проигрываем звук
        const audio = new Audio(soundURL);
        audio.play();
    }
}