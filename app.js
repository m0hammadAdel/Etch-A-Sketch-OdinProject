// --------------- global variables --------------
// board variables
const board = document.querySelector('.board');
const grid = document.querySelector('.slider');
const gridNum = document.querySelector('.slider-info');
// buttons variables
const btns = document.getElementById('btns');
const allBtns = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const costumeColor = document.getElementById('costume');
// helper buttons variables
let activeBtn = 'color';
const cellBorder = '2px solid #888';
const cellColor = {
    color: defaultValue,
    rainbow: createRandomColor,
    erase: removeCellColor,
    costume: getCostumeColor
}

// ----------------- main program ----------------
//render grid for the board area at first
formBoardGrid(grid.value);
//change range according to user
grid.addEventListener('input', ()=>{
    formBoardGrid(grid.value);
    gridNum.textContent = `${grid.value} by ${grid.value}`;
    clearHoleBorder();
});
// get state of table
btns.addEventListener('click', (e)=>{
    if(e.target.dataset.id) {
        activeBtn = e.target.dataset.id;
        allBtns.forEach((btn)=>{
            btn.classList.remove('active-btn');
        });
        e.target.classList.add('active-btn');
    }
})
// start coloring the board
board.addEventListener("mouseover", (e)=>{
    e.target.style.backgroundColor = cellColor[activeBtn](e.target);
})
// clear hole board
clearBtn.addEventListener('click', clearHoleBorder);


// --------------- helper functions --------------
function formBoardGrid(currentGrid) {
    const cellsNum = currentGrid ** 2;
    const fragment = new DocumentFragment;
    for (let i = 0; i<cellsNum ; i++) {
        fragment.appendChild(createDiv());
    }
    board.appendChild(fragment);
    board.style.display = 'grid';
    board.style.gridTemplateColumns = `repeat(${currentGrid}, ${board.clientWidth/currentGrid}px)`;
    board.style.gridTemplateRows = `repeat(${currentGrid}, ${board.clientWidth/currentGrid}px)`;
}

function createDiv(currentGrid) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.style.height = `${board.clientWidth/currentGrid}px`;
    newDiv.style.width = `${board.clientWidth/currentGrid}px`;
    return newDiv;
}

// color mood selection
function defaultValue(element) {
    element.style.border = 'none';
    return 'black';
}

function createRandomColor(element) {
    element.style.border = 'none';
    const colorPalate = '123456789abcdef';
    let newColor = '#';
    for (let i = 0; i<6; i++) {
        newColor += colorPalate[Math.floor(Math.random()*colorPalate.length)];
    }
    return newColor;
}

function removeCellColor(element) {
    element.style.borderBottom = cellBorder;
    element.style.borderRight = cellBorder;
    return 'transparent';
}

function getCostumeColor(element) {
    element.style.border = 'none';
    return costumeColor.value;
}

function clearHoleBorder() {
    const cells = board.querySelectorAll('.cell');
    cells.forEach((cell)=>{
        cell.style.backgroundColor = 'transparent';
        cell.style.borderBottom = cellBorder;
        cell.style.borderRight = cellBorder;
    });
}
