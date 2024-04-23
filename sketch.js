let size = 10;
let sizeX = 8;
let sizeY = 8;
let sizeZ = 20;
let myHeight = sizeZ * size;
let myWidth = sizeX * size;
let myLength = sizeY * size;
let cube;
let font;

function preload() {
  font = loadFont('assets/Inconsolata.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); 
  textFont(font);
  textSize(32);
  easycam = new Dw.EasyCam(this._renderer, {distance:300, center:[int(myWidth/2),int(myLength/2),int(myHeight/2)], rotation:[1,0,0,0]});
  easycam.rotateZ(-PI/12);
  easycam.rotateX(-PI/3);
  game = new Game(size)
  game.start(sizeZ, sizeX, sizeY, size)
}

function draw() {
  background(0);
  game.action();
}