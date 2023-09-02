// asteroidEvasion.module.js
import {Module} from '../core/module' // импортируем базовый класс Module

const asteroidImage = new Image();
asteroidImage.src = './public/asteroid2.png'
const shipImage = new Image();
shipImage.src = './public/inter1.png';
export class AsteroidEvasionModule extends Module {
    constructor() {
        super('missileCommand', 'Ракетная команда');  // type и text для этого модуля ракеты
    }

    trigger() {
        // Получаем элемент холста и контекст отрисовки
        const canvas = document.getElementById('gameCanvas')
        const ctx = canvas.getContext('2d')

        // Определяем корабль игрока
        const ship = {
            x: canvas.width / 2,          // Центрируем корабль по горизонтали
            y: canvas.height - 50,        // Располагаем корабль внизу холста
            size: 30,                     // Размер корабля
            speed: 11                      // Скорость движения корабля
        }
        // Массив для хранения астероидов
        const asteroids = []
        // Массив для хранения лазеров
        const lasers = []
        // Переменная для хранения количества очков игрока
        let score = 0
        // Массив для хранения звезд
        const stars = [];

        let countdown = 3

        // Функция для отображения обратного отсчета
        function displayCountdown() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Очищаем холст
            ctx.font = '50px Arial';
            ctx.fillStyle = '#FFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);  // Рисуем текст по центру

            if (countdown > 1) {
                countdown--;
                setTimeout(displayCountdown, 1000);  // Обновляем обратный отсчет каждую секунду
            } else {
                setTimeout(update, 1000);  // Запускаем игру после завершения обратного отсчета
            }
        }


        // Функция для проверки столкновения двух кругов
        function checkCollision(circle1, circle2) {
            if(!circle1 || !circle2) return false;  // Если один из кругов не существует, то возвращаем false

            const distance = Math.sqrt((circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2)
            return distance < (circle1.size + circle2.size)
        }

        // Функция для создания нового астероида
        function createAsteroid() {
            const x = Math.random() * canvas.width
            const size = 20 + Math.random() * 40
            const speed = 1 + Math.random() * 2

            // Добавляем новый астероид в массив
            asteroids.push({
                x: x,
                y: -size,                // Появляется сверху холста
                size: size,
                speed: speed
            })
        }
        // Функция для создания новой звезды
        function createStar() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3;
            const speed = 1 + Math.random() * 3;

            stars.push({
                x: x,
                y: y,
                size: size,
                speed: speed
            });
        }


        // Функция для создания нового лазера
        function shootLaser() {
            lasers.push({
                x: ship.x,
                y: ship.y - ship.size,
                size: 5,
                speed: 10
            });
        }


        // Главная функция обновления игры
        function update() {
            // Очищаем холст
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // Случайное создание звезд
            for (let i = stars.length - 1; i >= 0; i--) {
                stars[i].y += stars[i].speed;

                // Если звезда выходит за пределы холста, удаляем ее
                if (stars[i].y > canvas.height) {
                    stars.splice(i, 1);
                    createStar(); // Создаем новую звезду вверху
                }
            }

            // Отрисовка звезд
            for (let star of stars) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = '#FFF';
                ctx.fill();
            }

            // Случайное создание астероидов
            if (Math.random() < 0.02) {
                createAsteroid()
            }

            // Обновляем позиции всех астероидов
            for (let i = asteroids.length - 1; i >= 0; i--) {
                asteroids[i].y += asteroids[i].speed;

                // Проверяем столкновение лазера с астероидом
                for (let l = lasers.length - 1; l >= 0; l--) {
                    // Проверяем на столкновение с астероидом
                    if (checkCollision(lasers[l], asteroids[i])) {
                        asteroids.splice(i, 1);
                        lasers.splice(l, 1);
                        score += 10;  // Увеличиваем счет
                        break;  // Выходим из внутреннего цикла, так как лазер уже уничтожен
                    }
                }

                // Проверяем на столкновение с кораблем
                if (checkCollision(ship, asteroids[i])) {
                    alert('Вы проиграли! Ваш счет: ' + score);
                    document.location.reload();
                    return;
                }
            }


            // Отрисовка лазеров и их движение
            for (let l = lasers.length - 1; l >= 0; l--) {
                ctx.beginPath();
                ctx.arc(lasers[l].x, lasers[l].y, lasers[l].size, 0, Math.PI * 2);
                ctx.fillStyle = 'red';
                ctx.fill();

                lasers[l].y -= lasers[l].speed;
            }

            // Рисуем астероиды
            for (const asteroid of asteroids) {
                ctx.drawImage(asteroidImage, asteroid.x - asteroid.size, asteroid.y - asteroid.size, asteroid.size * 3, asteroid.size * 3);
            }

            // Рисуем корабль игрока
            ctx.drawImage(shipImage, ship.x - ship.size, ship.y - ship.size, ship.size * 1.8, ship.size * 3);


            // Отображаем счет игрока
            ctx.font = '20px Arial'
            ctx.fillStyle = '#FFF'
            ctx.fillText('Очки: ' + score, 10, 30)

            // Повторное вызов update для следующего кадра
            requestAnimationFrame(update)
        }

        // Обработчик событий для управления кораблем с помощью стрелок на клавиатуре
        document.addEventListener('keydown', e => {
            if (e.key === 'Space' || e.key === ' ') {
                shootLaser();
            }
            if (e.key === 'ArrowLeft' && ship.x - ship.speed > 0) {
                ship.x -= ship.speed
            } else if (e.key === 'ArrowRight' && ship.x + ship.speed < canvas.width) {
                ship.x += ship.speed
            }
        })

        for (let i = 0; i < 100; i++) {
            createStar();
        }

        displayCountdown();
    }

    add(moduleInstance) {
        const menuItem = document.createElement('div');
        menuItem.innerHTML = moduleInstance.toHTML();
        const liElement = menuItem.firstElementChild;

        liElement.addEventListener('click', () => {
            moduleInstance.trigger();
            this.close();
        });

        this.el.appendChild(liElement);
    }
}