class Game {
  constructor() {
    this.board = null;
    this.score = 0;
    this.speed = 0;
    this.time = 0;
    this.counter = 0;
    this.status = "start";
  }

  start(height = 20, width = 10, length = 10, size = 10) {
    this.board = new Board(height, width, length, size);
    this.board.newFigure();
    this.score = 0;
    this.speed = 20;
    this.time = 0;
    this.counter = 0;
  }

  action() {
    if (this.status === "end") {
      fill(255);
      text("Game Over", 10, 30);
      text("Score: " + this.score, 10, 60);
      text("Time: " + this.time, 10, 90);
      return;
    } else {
      push()
      fill(255);
      text("Score: " + this.score, myWidth, 30);
      pop()
      this.time++;
      this.playerAction()
      if (this.time % this.speed === 0) {
        this.counter++;
        if (!this.board.canMove()){
          if (this.board.isOut()) {
            this.end();
            return;
          }
          this.board.updateGrid();
          this.score += (this.board.checkLines())*this.time;
          this.board.newFigure();
        } 
        this.move();
        if (this.counter % 100 === 0) {
          if (this.speed != 1) {
            this.speed--;
          }
        }
      }
      this.board.draw();
    }
  }

  move() {
    this.board.move();
  }

  playerAction() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      if (this.board.canMove(-1, 0, 0)) {
        this.board.move(-1, 0, 0);
      }
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      if (this.board.canMove(1, 0, 0)) {
        this.board.move(1, 0, 0);
      }
    } 
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      if (this.board.canMove(0, -1, 0)) {
        this.board.move(0, -1, 0);
      }
    } 
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      if (this.board.canMove(0, 1, 0)) {
        this.board.move(0, 1, 0);
      }
    }
    if (keyIsDown(32)) {
      if (this.board.canMove(0, 0, -1)) {
        this.board.move(0, 0, -1);
      }
    }
    if (keyIsDown(88)) {
      if (this.board.canMove(0, 0, 0, 1)) {
        this.board.move(0, 0, 0, 1);
      }
    }

    if (keyIsDown(67)) {
      if (this.board.canMove(0, 0, 0, 0, 1)) {
        this.board.move(0, 0, 0, 0, 1);
      }
    }

    if (keyIsDown(90)) {
      if (this.board.canMove(0, 0, 0, 0, 0, 1)) {
        this.board.move(0, 0, 0, 0, 0, 1);
      }
    }
    for (let i = 0; i < 400000; i++) {
    }
  }

  end() {
    background(255);
    this.status = "end";
  }

}
