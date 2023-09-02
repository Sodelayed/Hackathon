// shape.module.js
import {Module} from '../core/module'

export class ShapeModule extends Module {
    constructor() {
        super('shape', 'Random Shape');
    }

    trigger() {
        this.createRandomShape();
    }

    createRandomShape() {
        const shape = document.createElement('div');
        const shapeType = this.getRandomShapeType();
        const color = this.getRandomColor();
        const size = this.getRandomSize();
        const position = this.getRandomPosition(size);

        shape.style.backgroundColor = color;
        shape.style.position = 'fixed';
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.top = `${position.y}px`;
        shape.style.left = `${position.x}px`;

        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
        }

        document.body.appendChild(shape);

        // Опционально: Удаляем фигуру через 5 секунд
        setTimeout(() => {
            document.body.removeChild(shape);
        }, 5000);
    }

    getRandomShapeType() {
        const shapes = ['circle', 'square'];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getRandomSize() {
        const maxSize = 150;  // максимальный размер фигуры
        return Math.random() * maxSize;
    }

    getRandomPosition(size) {
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        return { x, y };
    }
}