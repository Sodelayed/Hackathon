const containerGames = document.querySelector('#container-games')
const welcome = document.querySelector('#welcome')

// скрытие начального текста
export function hideWelcome () {
  welcome.classList.add('d-none')
}

export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

// установка изображения фона
export function setBackgroundImage(path) {
  containerGames.style.background = `url(${path}) center/cover no-repeat`
}

// установка цвета фона
export function setBackgroundColor(color = '#fff') {
  containerGames.style.background = color
}

// добавление игры в контейнер
export function addGameInContainerGames(game) {
  hideWelcome()
  containerGames.classList.remove('d-none')
  containerGames.append(game)
}

// очистка контейнера с игрой
export function cleanerContainerGames() {
  containerGames.classList.add('d-none')
  containerGames.innerHTML = ''
}
