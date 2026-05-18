const minefield_size = 10

function get_location(){

}

function update_grid(){ 
    
}

function create_mines(){
    let minefield = []
    for(let index=0; index<minefield_size; index++) {
        let row=[]
        for(let j = 0; j<minefield_size; j++) {
            row.push(Math.random() < 0.15 ? "1" : "0");
        }
        minefield.push(row)
    }
    return minefield
    
}

function render_minefield() {
    const data = create_mines()
    let minefield = document.getElementById('minefield')

    minefield.innerHTML = ''

    for(let i = 0 ; i<data.length; i++) {
        for(let j = 0 ; j<data[i].length; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            
            if (data[i][j] === '1') {
                cell.classList.add("mine");
            }
            //pievieno katram cell lokaciju un event listeneru kas aktivize cell_click funkciju
            cell.dataset.row = i;
            cell.dataset.col = j;

            minefield.appendChild(cell);

            cell.addEventListener('click', cell_click);
            
        }
    }
}
function cell_click(event){
    const clickedCell = event.target;
    
    const row = parseInt(clickedCell.dataset.row);
    const col = parseInt(clickedCell.dataset.col);
    
    console.log(`Uzklikšķināts uz lokācijas: rinda ${row}, kolonna ${col}`);
}
function flag_a_mine(){

}


const start_btn = document.getElementById('btn_start')

start_btn.addEventListener('click', render_minefield)

