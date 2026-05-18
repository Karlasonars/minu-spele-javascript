function check_grid() {

}
function update_grid(){

}
function create_mines(){
    const minefield_size = 10
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
            cell.textContent = data[i][j];
            if (data[i][j] === '1') {
                cell.classList.add("mine");
            }
            minefield.appendChild(cell);
            
        }
    }
}
function flag_a_mine(){

}
const start_btn = document.getElementById('btn_start')

start_btn.addEventListener('click', render_minefield)
