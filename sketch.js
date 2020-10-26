let pavaImage;
let boccaImage;
let sopraccigliaImage;
let mySong;
let analyzer;

let myPersonalWords = [];

function preload(){
  pavaImage = loadImage("./assets/images/pava.png");
  boccaImage = loadImage("./assets/images/bocca.png");
  sopraccigliaImage = loadImage("./assets/images/sopracciglia.png");
  mySong = loadSound("./assets/sounds/buongiorno.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight)

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

}

function draw() {
  var volume = 0;

  background(0);

  volume = analyzer.getLevel();
  volume = map(volume,0,1,0,150);

  imageMode(CENTER);
  image(pavaImage, width/2,height/2, pavaImage.width, pavaImage.height);
  image(boccaImage, width/2,(height/2+volume), boccaImage.width, boccaImage.height);
  image(sopraccigliaImage, width/2,(height/2-(volume/2)), sopraccigliaImage.width, sopraccigliaImage.height);

  if (mySong.isPlaying() == false) {
    var textPlay = "Click to play";
    textFont("Crimson Pro");
    textAlign(CENTER);
    textSize(120);
    fill(255);
    text(textPlay, width/2, height/2);
  }

  for(let i = 0; i < myPersonalWords.length; i++) {
    myPersonalWords[i].run();
  }
}

function mouseClicked() {
    if (mySong.isPlaying() == false) {
      mySong.play();
      addWord();
      addWord();
      addWord();
      addWord();
      addWord();
      addWord();
    }
}

function addWord() {
  let possibleDirection = [-3,3];
  const orizzontalDirection = random(possibleDirection);
  const verticalDirection = random(possibleDirection);
  const aNewWord = new Word(random(100,width-100), random(100,height-100), orizzontalDirection, verticalDirection);
  myPersonalWords.push(aNewWord);
}

class Word {
  constructor(temp_x, temp_y, temp_do, temp_dv) {
    this.x = temp_x;
    this.y = temp_y;
    this.do = temp_do;
    this.dv = temp_dv;
  }

  updatePosition() {
    if (this.x > (windowWidth-20)) {
        this.do = (this.do)*(-1);
    }

    if (this.x < (20)) {
        this.do = (this.do)*(-1);
    }

    this.x += this.do;

    if (this.y > (windowHeight-20)) {
        this.dv = (this.dv)*(-1);
    }

    if (this.y < (20)) {
        this.dv = (this.dv)*(-1);
    }

    this.y += this.dv;

  }

  display() {
    push();
    var textWord = "Grande Bocelli!";
    textFont("Crimson Pro");
    textAlign(CENTER);
    textSize(30);
    fill(255);
    text(textWord, this.x, this.y);
    pop();

  }

  run() {
    this.updatePosition();
    this.display();
  }
}
