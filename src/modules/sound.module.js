// sound.module.js
import { Module } from '../core/module'
import { random } from '../utils'
export class RandomSoundModule extends Module {
    constructor() {
        super('randomSound', 'Случайный звук')
    }

    trigger() {
        welcome.classList.remove('d-none')
        this.playRandomSound()
    }

    playRandomSound() {
        // Список URL-адресов звуков
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
        ]

        // Выбираем случайный звук из списка
        const soundURL = sounds[random(0, sounds.length - 1)]
        // Создаем аудио объект и проигрываем звук
        const audio = new Audio(soundURL)
        audio.play()
    }
}