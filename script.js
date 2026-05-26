const minefield_size = 10;
let current_minefield = [];
let SPAWN_RATE = 0.10;
let totalMines = 0;
let flaggedMines = 0;
let correctlyFlagged = 0;
let timerInterval = null;
let elapsedSeconds = 0;
let gameActive = false;

const scoreValue = document.getElementById('score-value');
const flagsValue = document.getElementById('flags-value');
const timerValue = document.getElementById('timer-value');
const resultMessage = document.getElementById('result-message');
const start_btn = document.getElementById('btn_start');

function create_mines() {
    let minefield = [];
    let mines = 0;

    for (let index = 0; index < minefield_size; index++) {
        let row = [];
        for (let j = 0; j < minefield_size; j++) {
            const isMine = Math.random() < SPAWN_RATE;
            row.push(isMine ? '1' : '0');
            if (isMine) mines++;
        }
        minefield.push(row);
    }

    totalMines = mines;
    return minefield;
}

function resetGameState() {
    flaggedMines = 0;
    correctlyFlagged = 0;
    elapsedSeconds = 0;
    gameActive = true;
    resultMessage.textContent = '';
    stopTimer();
    updateScoreboard();
    startTimer();
}

function startTimer() {
    timerValue.textContent = elapsedSeconds;
    timerInterval = setInterval(() => {
        elapsedSeconds += 1;
        timerValue.textContent = elapsedSeconds;
    }, 1000);
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateScoreboard() {
    scoreValue.textContent = correctlyFlagged;
    flagsValue.textContent = `${flaggedMines} / ${totalMines}`;
    timerValue.textContent = elapsedSeconds;
}

function render_minefield() {
    current_minefield = create_mines();

    const minefield_element = document.getElementById('minefield');
    minefield_element.innerHTML = '';

    for (let i = 0; i < current_minefield.length; i++) {
        for (let j = 0; j < current_minefield[i].length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            // if(current_minefield[i][j] === "1"){
            //     cell.classList.add('bomb')
            // };

            minefield_element.appendChild(cell);

            cell.addEventListener('click', cell_click);
            cell.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                flag_a_mine(event);
            });
        }
    }

    resetGameState();
}

function count_mines(row, col) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;

            if (
                newRow >= 0 &&
                newRow < minefield_size &&
                newCol >= 0 &&
                newCol < minefield_size
            ) {
                if (current_minefield[newRow][newCol] === '1') {
                    count++;
                }
            }
        }
    }

    return count;
}

function revealCell(cell, row, col) {
    const mineCount = count_mines(row, col);
    cell.classList.add('white', 'revealed');
    cell.classList.remove('flagged');

    if (mineCount > 0) {
        cell.textContent = mineCount;
    } else {
        cell.textContent = '';
    }
}

function endGame(win) {
    gameActive = false;
    stopTimer();

    if (win) {
        resultMessage.textContent = `Spēle beigusies Visas mīnas atrastas ${elapsedSeconds} sekundēs.`;
    } else {
        resultMessage.textContent = 'Spēle beigusies Uzklikšķināji uz mīnas.';
    }
}

function checkWinCondition() {
    if (flaggedMines === totalMines && correctlyFlagged === totalMines) {
        endGame(true);
    }
}

function cell_click(event) {
    const clickedCell = event.target;

    if (!gameActive || clickedCell.classList.contains('revealed') || clickedCell.classList.contains('flagged')) {
        return;
    }

    const row = parseInt(clickedCell.dataset.row, 10);
    const col = parseInt(clickedCell.dataset.col, 10);

    if (current_minefield[row][col] === '1') {
        clickedCell.classList.add('mine', 'revealed');
        clickedCell.textContent = 'B';
        endGame(false);
        return;
    }

    revealCell(clickedCell, row, col);
}

function flag_a_mine(event) {
    const clickedCell = event.target;

    if (!gameActive || clickedCell.classList.contains('revealed')) return;

    const row = parseInt(clickedCell.dataset.row, 10);
    const col = parseInt(clickedCell.dataset.col, 10);

    if (clickedCell.classList.contains('flagged')) {
        clickedCell.classList.remove('flagged');
        clickedCell.textContent = '';
        flaggedMines -= 1;
        if (current_minefield[row][col] === '1') {
            correctlyFlagged -= 1;
        }
    } else {
        clickedCell.classList.add('flagged');
        clickedCell.textContent = 'M';
        flaggedMines += 1;
        if (current_minefield[row][col] === '1') {
            correctlyFlagged += 1;
        }
    }

    updateScoreboard();
    checkWinCondition();
}

start_btn.addEventListener('click', render_minefield);