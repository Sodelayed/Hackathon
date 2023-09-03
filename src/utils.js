const containerGames = document.querySelector('#container-games')

export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function setBackgroundImage(path) {
  if (!path) {
    containerGames.style.background = '#fff'
    return
  }
  containerGames.style.background = `url(${path}) center/cover no-repeat`
}

export function addGameInContainerGames(game) {
  containerGames.append(game)
}

export function cleanerContainerGames() {
  containerGames.innerHTML = ''
}
