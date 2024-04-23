class Board {
  constructor(height, width, length, size) {
    this.height = height;
    this.width = width;
    this.length = length;
    this.size = size;
    this.color = "white";
    this.grid = this.getEmptyBoard();
    this.figures = [];
  }

  getEmptyBoard() {
    // return a 3D array
    return new Array(this.height)
      .fill(0)
      .map(() =>
        new Array(this.width).fill(0).map(() => new Array(this.length).fill(0))
      );
  }

  draw() {
    this.drawBoard();
    for (let figure of this.figures) {
      figure.draw();
    }
  }

  drawBoard() {
    // draw the grid and border lines
    const { width, length, size, color } = this;
    const halfSize = size / 2;
    const heightSize = this.height * size;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < length; y++) {
        push();
        translate(x * size, y * size, 0);
        fill(color);
        box(size, size, 1);
        pop();
      }
    }

    push();
    stroke(255, 255, 255);
    line(-halfSize, -halfSize, 0, -halfSize, -halfSize, heightSize);
    line(width * size - halfSize, -halfSize, 0, width * size - halfSize, -halfSize, heightSize);
    line(width * size - halfSize, length * size - halfSize, 0, width * size - halfSize, length * size - halfSize, heightSize);
    line(-halfSize, length * size - halfSize, 0, -halfSize, length * size - halfSize, heightSize);
    line(-halfSize, -halfSize, heightSize, width * size - halfSize, -halfSize, heightSize);
    line(-halfSize, -halfSize, heightSize, -halfSize, length * size - halfSize, heightSize);
    line(width * size - halfSize, length * size - halfSize, heightSize, -halfSize, length * size - halfSize, heightSize);
    line(width * size - halfSize, length * size - halfSize, heightSize, width * size - halfSize, -halfSize, heightSize);
    pop();
  }

  move(x=0, y=0, z=-1, rotationX = 0, rotationY = 0, rotationZ = 0) {
    if (this.figures.length > 0) {
      let lastFigure = this.figures.pop();
      let shape = lastFigure.shape;
      if (rotationX !== 0) {
        shape = lastFigure.rotateX(rotationX === 1);
      } else if (rotationY !== 0) {
        shape = lastFigure.rotateY(rotationY === 1);
      } else if (rotationZ !== 0) {
        shape = lastFigure.rotateZ(rotationZ === 1);
      }
      lastFigure.move(x, y, z, shape);
      this.figures.push(lastFigure);
    }
  }

  canMove(x=0, y=0, z=-1, rotationX = 0, rotationY = 0, rotationZ = 0) {
    if (this.figures.length > 0) {
      let lastFigure = this.figures.pop();
      let shape = lastFigure.shape;
      if (rotationX !== 0) {
        shape = lastFigure.rotateX(rotationX === 1);
      } else if (rotationY !== 0) {
        shape = lastFigure.rotateY(rotationY === 1);
      } else if (rotationZ !== 0) {
        shape = lastFigure.rotateZ(rotationZ === 1);
      }
      let colide = this.colide(lastFigure.nextMove(x, y, z, shape));
      this.figures.push(lastFigure);
      return !colide;
    }
    return true;
  }

  colide(nextMove) {
    // check if the next move is valid
    const sizeMove = nextMove.shape.length;

    for (let i = 0; i < sizeMove; i++) {
      for (let j = 0; j < sizeMove; j++) {
        for (let k = 0; k < sizeMove; k++) {
          if (nextMove.shape[i][j][k] === 1) {
            if (nextMove.x + i >= sizeX || nextMove.y + j >= sizeY || nextMove.z + k >= sizeZ) {
              return true;
            }
            if (nextMove.x + i < 0 || nextMove.y + j < 0 || nextMove.z + k < 0) {
              return true;
            }
            if(this.grid[nextMove.z + k][nextMove.y + j][nextMove.x + i] == 1) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  newFigure() {
    const figure = new globalFigures[Math.floor(Math.random() * globalFigures.length)]();
    this.figures.push(figure);
  }

  updateGrid() {
    this.grid = this.getEmptyBoard();
    for (let figure of this.figures) {
      figure.shape.forEach((row, x) => {
        row.forEach((column, y) => {
          column.forEach((value, z) => {
            if (value > 0) {
              this.grid[z + figure.z][y + figure.y][x + figure.x] = 1;
            }
          });
        });
      });
    }
  }
  

  checkLines() {
    let lines = [];
    let score = 0;
    for (let z = 0; z < this.height; z++) {
      let line = 0;
      for (let y = 0; y < this.length; y++) {
        for (let x = 0; x < this.width; x++) {
          if (this.grid[z][y][x] === 1) {
            line++;
          }
        }
      }
      if (line === this.width * this.length) {
        console.log("line: ", z);
        lines.push(z);
        score += 10;
      }
    }

    // remove the lines from the grid and move all the lines above down
    for (let z of lines) {
      for (let i = z; i < this.height - 1; i++) {
        for (let y = 0; y < this.length; y++) {
          for (let x = 0; x < this.width; x++) {
            this.grid[i][y][x] = this.grid[i + 1][y][x];
          }
        }
      }
    }
    for (let figure of this.figures) {
      for (let i = 0; i < figure.shape.length; i++) {
        for (let j = 0; j < figure.shape.length; j++) {
          for (let k = 0; k < figure.shape.length; k++) {
            if (figure.shape[i][j][k] === 1) {
              if (lines.includes(figure.z + k)) {
                figure.shape[i][j][k] = 0;
              }
            }
          }
        }
      }
    }
    for (let z of lines) {
      for (let figure of this.figures) {
        if (figure.z > z) {
          figure.z--;
        }
      }
    }
    return score;
  }

  isOut() {
    let lastFigure = this.figures[this.figures.length - 1];
    for (let row of lastFigure.shape) {
      for (let column of row) {
        if (column.length > 0) {
          if(column.length + lastFigure.z >= this.height) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
