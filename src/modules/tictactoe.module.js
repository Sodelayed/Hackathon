import { Module } from '../core/module'
import { setBackgroundColor } from '../utils'
import { addGameInContainerGames } from '../utils'

export class TicTacToeModule extends Module {
  constructor() {
    super('tictactoe', 'Крестики-нолики')
  }

  trigger() {
    setBackgroundColor('#3ecfde')

    if (document.querySelector('#tictacContainer')) {
      return
    }

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    let options = ['', '', '', '', '', '', '', '', '']
    let currentPlayer = 'X'
    let running = true

    const tictacContainer = document.createElement('div')
    tictacContainer.id = 'tictacContainer'
    const title = document.createElement('h1')
    title.className = 'tictactoe-title'
    title.textContent = 'Крестики-нолики'
    tictacContainer.append(title)
    const table = document.createElement('div')
    table.id = 'cellContainer'
    tictacContainer.append(table)

    addGameInContainerGames(tictacContainer)

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div')
      cell.id = i
      cell.className = 'cell'
      table.append(cell)
    }
    const statusText = document.createElement('h2')
    statusText.className = 'tictactoe-text'
    statusText.id = 'statusText'

    tictacContainer.append(statusText)

    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell) =>
      cell.addEventListener('click', (event) => {
        const cellIndex = cell.getAttribute('id')

        if (options[cellIndex] != '' || !running) {
          return
        }

        updateCell(cell, cellIndex)
        checkWinner()
      })
    )

    function updateCell(cell, index) {
      options[index] = currentPlayer
      cell.textContent = currentPlayer
    }

    function changePlayer() {
      currentPlayer = currentPlayer == 'X' ? 'O' : 'X'
      statusText.textContent = `${currentPlayer}'s turn`
    }

    function checkWinner() {
      let roundWon = false

      for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if (cellA == '' || cellB == '' || cellC == '') {
          continue
        }
        if (cellA == cellB && cellB == cellC) {
          roundWon = true
          break
        }
      }

      if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`
        running = false
      } else if (!options.includes('')) {
        statusText.textContent = `Draw!`
        running = false
      } else {
        changePlayer()
      }
    }
  }
}
