class Figure {
  constructor() {
    this.x = int(sizeX / 2);
    this.y = int(sizeY / 2);
    this.z = int(sizeZ) - 1;
    this.size = size;
    this.shape = [];
    this.color = "white";
  }
  draw() {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        for (let k = 0; k < this.shape[i][j].length; k++) {
          if (this.shape[i][j][k] === 1) {
            push();
            translate(
              (this.x + i) * size,
              (this.y + j) * size,
              (this.z + k) * size + size / 2
            );
            fill(this.color);
            box(size);
            pop();
          }
        }
      }
    }
  }

  move(x = 0, y = 0, z = 0, shape = this.shape) {
    this.z += z;
    this.x += x;
    this.y += y;
    this.shape = shape;
  }

  nextMove(x = 0, y = 0, z = 0, shape = this.shape) {
    return { x: this.x + x, y: this.y + y, z: this.z + z, shape: shape };
  }

  rotateX() {
    const sizeArray = this.shape.length;
    const newShape = new Array(sizeArray)
      .fill(0)
      .map(() =>
        new Array(sizeArray).fill(0).map(() => new Array(sizeArray).fill(0))
      );
    for (let i = 0; i < sizeArray; i++) {
      let temp = [];
      for (let j = 0; j < sizeArray; j++) {
        temp[j] = [];
        for (let k = 0; k < sizeArray; k++) {
          temp[j][k] = this.shape[i][j][k];
        }
      }
      for (let j = 0; j < sizeArray; j++) {
        for (let k = 0; k < sizeArray; k++) {
          newShape[i][j][k] = temp[sizeArray - k - 1][j];
        }
      }
    }
    return newShape;
  }

  rotateY() {
    const sizeArray = this.shape.length;
    const newShape = new Array(sizeArray)
      .fill(0)
      .map(() =>
        new Array(sizeArray).fill(0).map(() => new Array(sizeArray).fill(0))
      );
    for (let j = 0; j < sizeArray; j++) {
      let temp = [];
      for (let i = 0; i < sizeArray; i++) {
        temp[i] = [];
        for (let k = 0; k < sizeArray; k++) {
          temp[i][k] = this.shape[i][j][k];
        }
      }
      for (let i = 0; i < sizeArray; i++) {
        for (let k = 0; k < sizeArray; k++) {
          newShape[i][j][k] = temp[sizeArray - k - 1][i];
        }
      }
    }
    return newShape;
  }

  rotateZ() {
    const sizeArray = this.shape.length;
    const newShape = new Array(sizeArray)
      .fill(0)
      .map(() =>
        new Array(sizeArray).fill(0).map(() => new Array(sizeArray).fill(0))
      );
    for (let i = 0; i < sizeArray; i++) {
      for (let j = 0; j < sizeArray; j++) {
        for (let k = 0; k < sizeArray; k++) {
          newShape[i][j][k] = this.shape[j][sizeArray - i - 1][k];
        }
      }
    }
    return newShape;
  }
}

class Cube extends Figure {
  constructor() {
    super();
    this.color = "red";
    this.shape = [[[1]]];
  }
}

class Tri extends Figure {
  constructor() {
    super();
    this.color = "blue";
    this.shape = [
      [
        [1, 0],
        [1, 1],
      ],
      [
        [0, 0],
        [0, 0],
      ],
    ];
  }
}

class Tetra extends Figure {
  constructor() {
    super();
    this.color = "green";
    this.shape = [
      [
        [1, 1],
        [1, 0],
      ],
      [
        [1, 0],
        [0, 0],
      ],
    ];
  }
}

class BigEl extends Figure {
  constructor() {
    super();
    this.color = "yellow";
    this.shape = [
      [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ];
  }
}

class Triangle extends Figure {
  constructor() {
    super();
    this.color = "purple";
    this.shape = [
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      [
        [0, 0, 0],
        [1, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    ];
  }
}

class Scalon extends Figure {
  constructor() {
    super();
    this.color = "orange";
    this.shape = [
      [
        [0, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      [
        [1, 0, 0],
        [1, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    ];
  }
}

class Scalon_l extends Figure {
  constructor() {
    super();
    this.color = "orange";
    this.shape = [
      [
        [1, 1],
        [1, 0],
      ],
      [
        [0, 0],
        [1, 0],
      ],
    ];
  }
}

class Scalon_r extends Figure {
  constructor() {
    super();
    this.color = "orange";
    this.shape = [
      [
        [1, 0],
        [1, 1],
      ],
      [
        [1, 0],
        [0, 0],
      ],
    ];
  }
}

class Line extends Figure {
  constructor() {
    super();
    this.color = "cyan";
    this.shape = [
      [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ];
  }
}


let globalFigures = [
  Cube,
  Tri,
  Tetra,
  BigEl,
  Triangle,
  Scalon,
  Scalon_l,
  Scalon_r,
  Line,
];
