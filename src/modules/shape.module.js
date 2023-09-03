// shape.module.js
import {Module} from '../core/module'
import {random} from '../utils';

// Создание нового модуля для отображения случайных геометрических фигур
export class ShapeModule extends Module {
    constructor() {
        // Инициализация с базовым типом и текстовым описанием
        super('shape', 'Случайная фигура')
    }

    // Главный метод для вызова функционала модуля
    trigger() {
        welcome.classList.remove('d-none')
        this.createRandomShape()
    }

    // Создание случайной геометрической фигуры
    createRandomShape() {
        // Создание нового DOM-элемента для фигуры
        const shape = document.createElement('div')
        // Определение типа, цвета, размера и позиции фигуры
        const shapeType = this.getRandomShapeType()
        const color = this.getRandomColor()
        const size = this.getRandomSize()
        const position = this.getRandomPosition(size)

        // Применение стилей к элементу фигуры
        shape.style.backgroundColor = color
        shape.style.position = 'fixed'
        shape.style.width = `${size}px`
        shape.style.height = `${size}px`
        shape.style.top = `${position.y}px`
        shape.style.left = `${position.x}px`

        // Если выбрана круглая фигура, устанавливаем borderRadius
        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%'
        }

        // Добавляем фигуру на страницу
        document.body.appendChild(shape)

        // Удаляем фигуру через 5 секунд
        setTimeout(() => {
            document.body.removeChild(shape)
        }, 5000)
    }

    // Возвращает случайный тип фигуры (круг или квадрат)
    getRandomShapeType() {
        const shapes = ['circle', 'square']
        return shapes[random(0, shapes.length - 1)]
    }

    // Генерация случайного цвета
    getRandomColor() {
        const randomColor = `#${random(0, 16777215).toString(16).padStart(6, '0')}`
        return randomColor
    }

    // Возвращает случайный размер фигуры
    getRandomSize() {
        const maxSize = 150  // максимальный размер фигуры
        return random(0, maxSize)
    }

    // Вычисляет случайную позицию для фигуры на экране
    getRandomPosition(size) {
        // Убедитесь, что фигура полностью помещается в пределах экрана
        const x =random(0, window.innerWidth - size)
        const y = random(0, window.innerHeight - size)
        return { x, y }
    }
}