let gameText = document.getElementById('gameText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  `--winning-blocks`
)

const X_TEXT = 'X'
const O_TEXT = 'O'
const NO_PLAYER = ' '
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
  boxes.forEach((box) => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
  const id = e.target.id

  if (!spaces[id]) {
    spaces[id] = currentPlayer
    e.target.innerText = currentPlayer

    if (playerHasWon() !== false) {
      // gameText.innerHTML = `${currentPlayer} has won!`
      let winning_blocks = playerHasWon()

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      )
      return
    // } else if (playerHasWon() == false) {
    //   gameText.innerHTML = `It was a tie!`
    // }

      }
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
  }
}

let winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

// function endPlay () {
//         currentPlayer = NO_PLAYER
// }

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      gameText.innerHTML = `${currentPlayer} has won!`
      // Trying to make the null spaces unclickable.
      // for(let i = 0; i <= spaces.length; i++){
      //   console.log([i]);
      // }
      return [a, b, c]
    }
  }
  return false
}

restartBtn.addEventListener('click', restart)

function restart() {
  spaces.fill(null)

  boxes.forEach((box) => {
    box.innerText = ''
    box.style.backgroundColor = ''
  })

  gameText.innerHTML = 'Tic Tac Toe'

  currentPlayer = X_TEXT
}

startGame()
