class Cell {
    constructor(i, j, w) {
        this.bee = false;
        this.revealed = false;
        this.i = i;
        this.j = j;
        this.x = i * w;
        this.y = j * w;
        this.w = w;
        this.beecount = -1;
    }
    show() {
        stroke(0);
        fill(255);
        rect(this.x, this.y, this.w, this.w);
        if (this.revealed) {
            if (this.bee) {
                fill(120);
                ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w / 2);
            } else {
                fill(120);
                rect(this.x, this.y, this.w, this.w);
                if (this.beecount > 0) {
                    noFill();
                    textAlign(CENTER);
                    text(this.beecount, this.x + w / 2, this.y + w / 1.5);
                }
            }
        }
    }

    contain(x, y) {
        return (
            x > this.x &&
            x < this.x + this.w &&
            y > this.y &&
            y < this.y + this.w
        );
    }

    countbee() {
        if (this.bee) {
            this.beecount = -1;
            return;
        }
        let total = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let x = this.i + i;
                let y = this.j + j;
                if (x >= 0 && x < cols && y >= 0 && y < rows) {
                    let neighbour = grid[x][y];
                    if (neighbour.bee) {
                        total++;
                    }
                }
            }
        }
        this.beecount = total;
    }

    reveal() {
        this.revealed = true;
        if (this.beecount == 0) this.floodfill();
    }

    floodfill() {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let x = this.i + i;
                let y = this.j + j;
                if (x >= 0 && x < cols && y >= 0 && y < rows) {
                    let neighbour = grid[x][y];
                    if (!neighbour.revealed) {
                        neighbour.reveal();
                    }
                }
            }
        }
    }
}
