const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to handle cell clicks
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignore clicks on already filled cells or when the game is over
    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    // Update the board and UI
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
};

// Function to check game result
const checkResult = () => {
    let roundWon = false;

    // Check all winning conditions
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    // Check for a draw
    if (!board.includes('')) {
        statusDisplay.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
};

// Function to reset the game
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Set initial game status
statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
