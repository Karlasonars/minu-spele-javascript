const minefield_size = 10;
let current_minefield = []; 

function create_mines() {
    let minefield = [];
    for(let index = 0; index < minefield_size; index++) {
        let row = [];
        for(let j = 0; j < minefield_size; j++) {
            row.push(Math.random() < 0.15 ? "1" : "0");
        }
        minefield.push(row);
    }
    return minefield;
}

function render_minefield() {
    
    current_minefield = create_mines();
    
    let minefield_element = document.getElementById('minefield');
    minefield_element.innerHTML = '';

    for(let i = 0; i < current_minefield.length; i++) {
        for(let j = 0; j < current_minefield[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            
            if (current_minefield[i][j] === '1') {

                cell.classList.add("mine");

            }
            
            cell.dataset.row = i;
            cell.dataset.col = j;

            minefield_element.appendChild(cell);

            cell.addEventListener('click', cell_click);
            cell.addEventListener("contextmenu", (event) => {event.preventDefault();flag_a_mine(event);});
        }
    }
}


function count_mines(row, col) {
    let count = 0;

   
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let newRow = row + i;
            let newCol = col + j;

            
            if (newRow >= 0 && newRow < minefield_size && newCol >= 0 && newCol < minefield_size) {
                
                if (current_minefield[newRow][newCol] === '1') {
                    count++;
                }
         
         
         
         
         
            }
        }
    }
    return count;
}

function cell_click(event) {
    const clickedCell = event.target;
    
    const row = parseInt(clickedCell.dataset.row);
    const col = parseInt(clickedCell.dataset.col);
    
    
    if (current_minefield[row][col] === '1') {
        clickedCell.classList.add("mine");
        clickedCell.textContent = "b";
        return;
    }

    
    const mineCount = count_mines(row, col);
    
    clickedCell.classList.add("white"); 
    
    if (mineCount > 0) {
        clickedCell.textContent = mineCount; 
    } else {
        clickedCell.textContent = ""; 
    }

    console.log(`Uzklikšķināts uz lokācijas: rinda ${row}, kolonna ${col}. Blakus mīnas: ${mineCount}`);
}

function flag_a_mine(event) {
    const clickedCell = event.target;
    
    if (clickedCell.classList.contains("revealed")) return;

    if (clickedCell.textContent === 'M') {
        clickedCell.textContent = ''; 
    } else {
        clickedCell.textContent = 'M';
    }
}

const start_btn = document.getElementById('btn_start');
start_btn.addEventListener('click', render_minefield);