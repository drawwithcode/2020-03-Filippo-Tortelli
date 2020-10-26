let pavaImage;
let boccaImage;
let sopraccigliaImage;
let mySong;
let analyzer;

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

  //mySong.play();
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

  console.log(volume);
}

function mouseClicked() {
    if (mySong.isPlaying() == false) {
      mySong.play();
    }
    else {
      mySong.stop();
    }
}
