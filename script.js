const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');
const backButton = document.getElementById('backButton');
const pvpButton = document.getElementById('pvpButton');
const gameContainer = document.getElementById('game-container');

let isXTurn = true;
let board = Array(9).fill(null);
let gameOver = false;

// Initialize game
function initGame() {
    board = Array(9).fill(null);
    isXTurn = true;
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.pointerEvents = 'auto';
    });
    gameStatus.textContent = `It's X's turn`;
    document.body.style.backgroundColor = getRandomColor(); // Set a random color
}

// Handle cell click
function handleClick(e) {
    if (gameOver) return;
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== null) return; 

    board[cellIndex] = currentClass;
    cell.textContent = currentClass;
    cell.classList.add(currentClass);
    cell.style.pointerEvents = 'none';

    if (checkWin(currentClass)) {
        gameStatus.textContent = `${currentClass} wins!`;
        gameOver = true;
    } else if (board.every(cell => cell !== null)) {
        gameStatus.textContent = "It's a draw!";
        gameOver = true;
    } else {
        isXTurn = !isXTurn;
        gameStatus.textContent = `It's ${isXTurn ? 'X' : 'O'}'s turn`;
        document.body.style.backgroundColor = getRandomColor(); // Change color on each turn
    }
}

// Check for win
function checkWin(currentClass) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentClass)
    );
}

// Start Game
function startGame() {
    gameContainer.classList.remove('hidden');
    gameContainer.classList.remove('hidden');
    pvpButton.classList.add('hidden'); // Hide the play button after starting
    initGame();
}

// Back to Menu
function backToMenu() {
    gameContainer.classList.add('hidden');
    pvpButton.classList.remove('hidden'); // Show play button again
    initGame();
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Event Listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', initGame);
backButton.addEventListener('click', backToMenu);
pvpButton.addEventListener('click', startGame);
