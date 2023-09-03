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
        ];
        const currentPlayer = 'X'
        const aiPlayer = 'O'
        let origBoard

        const tictacContainer = document.createElement('div')
        tictacContainer.id = "tictacContainer"
        document.body.append(tictacContainer)
        const title = document.createElement('h1')
        title.textContent = "Крестики-нолики"
        tictacContainer.append(title)
        const table = document.createElement('div')
        table.id = "cellContainer"
        tictacContainer.append(table)

        addGameInContainerGames(tictacContainer)
        
        for (let i=0;i<9;i++) {
            const cell = document.createElement('div')
            cell.id = i
            cell.className = "cell"
            table.append(cell)
        }
        const statusText = document.createElement('h2')
        statusText.id = "statusText"

        tictacContainer.append(statusText)
        
        
        const cells = document.querySelectorAll(".cell")
        document.querySelector("#statusText").style.display = "none"
        origBoard = Array.from(Array(9).keys());
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
            cells[i].addEventListener('click', turnClick, false);
        }

        function turnClick(square) {
            if (typeof origBoard[square.target.id] == 'number') {
                turn(square.target.id, currentPlayer)
                if (!checkWin(origBoard, currentPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
            }
        }
        
        function turn(squareId, player) {
            origBoard[squareId] = player;
            document.getElementById(squareId).innerText = player;
            let gameWon = checkWin(origBoard, player)
            if (gameWon) gameOver(gameWon)
        }
        
        function checkWin(board, player) {
            let plays = board.reduce((a, e, i) =>
                (e === player) ? a.concat(i) : a, []);
            let gameWon = null;
            for (let [index, win] of winConditions.entries()) {
                if (win.every(elem => plays.indexOf(elem) > -1)) {
                    gameWon = {index: index, player: player};
                    break;
                }
            }
            return gameWon;
        }
        
        function gameOver(gameWon) {
            for (let index of winConditions[gameWon.index]) {
                document.getElementById(index).style.backgroundColor =
                    gameWon.player == currentPlayer ? "blue" : "red";
            }
            for (var i = 0; i < cells.length; i++) {
                cells[i].removeEventListener('click', turnClick, false);
            }
            declareWinner(gameWon.player == currentPlayer ? "You win!" : "You lose.");
        }
        
        function declareWinner(who) {
            document.querySelector("#statusText").style.display = "block";
            document.querySelector("#statusText").innerText = who;
        }
        
        function emptySquares() {
            return origBoard.filter(s => typeof s == 'number');
        }
        
        function bestSpot() {
            return minimax(origBoard, aiPlayer).index;
        }
        
        function checkTie() {
            if (emptySquares().length == 0) {
                for (var i = 0; i < cells.length; i++) {
                    cells[i].style.backgroundColor = "green";
                    cells[i].removeEventListener('click', turnClick, false);
                }
                declareWinner("Tie Game!")
                return true;
            }
            return false;
        }
        
        function minimax(newBoard, player) {
            var availSpots = emptySquares();
        
            if (checkWin(newBoard, currentPlayer)) {
                return {score: -10};
            } else if (checkWin(newBoard, aiPlayer)) {
                return {score: 10};
            } else if (availSpots.length === 0) {
                return {score: 0};
            }
            var moves = [];
            for (var i = 0; i < availSpots.length; i++) {
                var move = {};
                move.index = newBoard[availSpots[i]];
                newBoard[availSpots[i]] = player;
        
                if (player == aiPlayer) {
                    var result = minimax(newBoard, currentPlayer);
                    move.score = result.score;
                } else {
                    var result = minimax(newBoard, aiPlayer);
                    move.score = result.score;
                }
        
                newBoard[availSpots[i]] = move.index;
        
                moves.push(move);
            }
        
            var bestMove;
            if(player === aiPlayer) {
                var bestScore = -10000;
                for(var i = 0; i < moves.length; i++) {
                    if (moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            } else {
                var bestScore = 10000;
                for(var i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
        
            return moves[bestMove];
        }
  }
}
