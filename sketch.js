var monkey, monkey_running, banana, bananaImage, obstacle, obstacleImage, FoodGroup, obstacleGroup, backgroundi, x, y, invisableground, edges, bi, si, bi3, temp, b1, b2, b3, st, monkeystop, restart, gameover, rt, go;
var survivaltime = 0
var score = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  backgroundi = loadImage("you.jpg")
  bi = loadImage("wer.png")
  si = loadImage("stone1.png")
  bi3 = loadImage("b3.png")
  monkeystop = loadImage("sprite_1.png");
  restart = loadImage("t.png")
  gameover = loadImage("iop.jpg")
}



function setup() {
  createCanvas(600, 400)
  invisableground = createSprite(300, 380, 600, 10);
  invisableground.visible = false;
  edges = createEdgeSprites()
  monkey = createSprite(80, 350, 20, 20)
  monkey.addAnimation("moving", monkey_running)
  monkey.addAnimation("stop", monkeystop)
  monkey.scale = 0.15
  temp = 0
  x = 0
  y = -width
  b1 = new Group()
  b2 = new Group()
  b3 = new Group()
  st = new Group()
  gamestate = 0
  rt = createSprite(600 / 2, 300);
  rt.addImage(restart)
  rt.visible = false
  go = createSprite(600 / 2, 150);
  go.addImage(gameover)
  go.scale = 0.2
  go.visible = false

}

function banana() {
  if (frameCount % 100 == 0) {
    var banana = createSprite(600, Math.round(random(120, 200)), 10, 10);
    banana.velocityX = -2;
    banana.addImage(bananaImage)
    banana.scale = 0.1
    banana2.lifetime = 290;
    b1.add(banana)
  }
}

function banana2() {
  if (frameCount % 100 == 0) {
    var banana2 = createSprite(600, Math.round(random(100, 150)), 10, 10);
    banana2.velocityX = -2;
    banana2.addImage(bi)
    banana2.scale = 0.2
    banana2.lifetime = 290;
    b2.add(banana2)
  }
}

function stone() {
  if (frameCount % 300 == 0) {
    var stone = createSprite(600, 370, 10, 10);
    stone.velocityX = -2;
    stone.addImage(si)
    stone.scale = 0.3
    stone.lifetime = 290
    st.add(stone)

  }
}

function banana3() {
  if (frameCount % 100 == 0) {
    var banana3 = createSprite(600, Math.round(random(100, 150)), 10, 10);
    banana3.velocityX = -2;
    banana3.addImage(bi3)
    banana3.scale = 0.2
    banana3.lifetime = 290;
    b3.add(banana3)
  }
}

function callback(s1, s2) {
  s1.remove();
}

function draw() {
  background(200);

  if (gamestate == 0) {
    image(backgroundi, x, 0, width, height)
    x = x + 1.5;
    image(backgroundi, y, 0, width, height)
    y = y + 1.5;
    if (x >= width) {
      x = -width
    }
    if (y >= width) {
      y = -width
    }
    if (keyDown("space")) {
      monkey.velocityY = -10;
    }
    textSize(20)
    fill("white")
    text("press space bar to make the monkey jump", 30, 50)

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisableground);
    stone()
    monkey.bounceOff(edges)
    var bananas = Math.round(random(1, 3));
    if (frameCount % 100 == 0) {
      if (bananas == 1) {
        banana()
      } else if (bananas == 2) {
        banana2()
      } else if (bananas == 3) {
        banana3()
      }
    }
    if (st.isTouching(monkey)) {
      gamestate = 1
    }
    if (frameCount % 60 == 0) {
      survivaltime += 1
      temp = survivaltime
    }
    if (b1.collide(monkey, callback)) {
      score = score + 1;
    }
    if (b2.collide(monkey, callback)) {
      score = score + 4;
    }
    if (b3.collide(monkey, callback)) {
      score = score + 3;
    }
  } else if (gamestate == 1) {
    b1.setVelocityXEach(0);
    b2.setVelocityXEach(0);
    b3.setVelocityXEach(0);
    st.setVelocityXEach(0);
    st.setLifetimeEach(-1)
    b1.setLifetimeEach(-1)
    b2.setLifetimeEach(-1)
    b3.setLifetimeEach(-1)
    monkey.changeAnimation("stop")
    go.visible = true;
    rt.visible = true;
    image(backgroundi, x, 0, width, height)
    x = x + 0;
    image(backgroundi, y, 0, width, height)
    y = y + 0;
    if (x >= width) {
      x = -width
    }
    if (y >= width) {
      y = -width
    }
    if (mousePressedOver(rt)) {
      b1.destroyEach()
      b2.destroyEach()
      b3.destroyEach()
      st.destroyEach()
      go.visible = false;
      rt.visible = false;
      score = 0
      survivaltime = 0
      monkey.changeAnimation("moving")
      gamestate = 0
    }
  }
  monkey.collide(invisableground);
  drawSprites();
  stroke("black")
  fill("yellow")
  textSize(30)
  text(" survival Time : " + survivaltime, 20, 25)

  textSize(30);
  fill("yellow")
  text("Food Count:"+ score, 380, 25)
}