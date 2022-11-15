function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let w = 50;
let cols, rows;
let totalBees = 10;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, w);
        }
    }

    let option = [];
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            option.push([i, j]);
        }
    }
    for (let n = 0; n < totalBees; n++) {
        let index = floor(random(option.length));
        grid[option[index][0]][option[index][1]].bee = true;
        option.splice(index, 1);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].countbee();
        }
    }
}

function mousePressed() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].contain(mouseX, mouseY)) {
                grid[i][j].reveal();
                if (grid[i][j].bee) gameover();
            }
        }
    }
}

function draw() {
    background(51);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }
}

function gameover() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}
