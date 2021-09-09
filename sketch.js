var bg;
var gameState = "notStarted";
var shooter;
var b = [];
var bulletState = "notFired";
var e = [];
var l = [];
var diff = 70;
var rockState = "normal";
var sHealth = 3;
var h1;
var h2;
var h3;
var musicVolume = 0.6;
var loadingScreen;
var score = 0;
var startButton;
var helpButton;
var logo;
var help;
var back;
var reloadPrompt;
var shootTimer = 0;
var scoreCounter;
var scoreCounterState = "normal";
var formState = "no";
var slider;


function preload() {

    wall = loadImage('bg.jpeg');
    bgImage = loadAnimation('bg.png');
    backMusic = loadSound('background.ogg');
    start = loadAnimation('startButton.png');
    helpButtonImage = loadAnimation('htp.png');
    logoImage = loadAnimation('logo.png');
    blast1 = loadSound('blast/blast1.ogg');
    blast3 = loadSound('blast/blast3.ogg');
    blast2 = loadSound('blast/blast2.ogg');
    healthAnimation = loadAnimation('health.png');
    noHealth = loadAnimation('outline.png');
    ended = loadImage('ended.gif');
    helpImage = loadAnimation('help.png');
    lobby_sound = loadSound('lobby_sound.ogg');
    lose_background = loadSound('lose_background.ogg');
    spaceShipAnimation = loadAnimation(
        'spaceship/1.png',
        'spaceship/2.png',
        'spaceship/3.png',
        'spaceship/4.png',
        'spaceship/5.png',
        'spaceship/6.png',
        'spaceship/7.png',
        'spaceship/8.png');
    bulletAnimation = loadAnimation('bullet/bullet.png');
    bulletAnimation2 = loadAnimation('bullet/new/1.png', 'bullet/new/2.png', 'bullet/new/3.png', 'bullet/new/4.png', 'bullet/new/5.png')
    bulletAnimation3 = loadAnimation('bullet/bullet3.png');
    rockAnimation = loadAnimation('rock.png');
    shoot = loadSound('shoot.ogg');
    shoot2 = loadSound('shoot2.ogg');
    shoot3 = loadSound('shoot4.ogg');
    help = createSprite(200, 200);
    reload = loadAnimation('reload.jpg');
    help.addAnimation('help', helpImage);
    help.visible = false;
    backButton = loadImage('back_button.png');
    lifeAnimation = loadAnimation('life.png');
    scoreCounter1 = loadAnimation('score/1.png');
    scoreCounter2 = loadAnimation('score/2.png');
    scoreCounter3 = loadAnimation('score/3.png');
    fullscreen(true);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    createsprite = createSprite;
    shealth = sHealth;
    fullscreen(true);
    bg = createSprite(width / 2, -650 + height);
    bg.addAnimation('bg', bgImage);
    bg.visible = false;
    startButton = createSprite(width / 2, height / 3 + height / 2 - 80);
    helpButton = createSprite(width / 2, (height / 3 + height / 2) + 320);
    logo = createSprite(width / 2, (height / 2) - 100);
    startButton.addAnimation('start', start);
    startButton.scale = 0.6
    helpButton.scale = 0.6
    logo.scale = 0.6;
    reloadPrompt = createSprite(width / 2, logo.y);
    reloadPrompt.addAnimation('prompt', reload);
    helpButton.addAnimation('help', helpButtonImage);
    logo.addAnimation('logo', logoImage);
    loseSound = loadSound('lose.ogg');
    shooter = createSprite(width / 2, height / 3 + height / 2);
    shooter.addAnimation('normal', spaceShipAnimation);
    shooter.visible = false;
    h1 = createSprite(50, 30);
    h2 = createsprite(150, 30);
    h3 = createSprite(250, 30);
    h1.scale = 0.1;
    h2.scale = h1.scale;
    h3.scale = h1.scale;
    h1.addAnimation('health1', healthAnimation);
    h1.addAnimation('outline1', noHealth);
    h2.addAnimation('health2', healthAnimation);
    h2.addAnimation('outline2', noHealth);
    h3.addAnimation('health3', healthAnimation);
    h3.addAnimation('outline3', noHealth);

    h1.visible = false;
    h2.visible = false;
    h3.visible = false;
    back = createSprite(10000, 50);
    back.addAnimation('back', backButton);
    back.visible = false;
    back.scale = 0.7;

    scoreCounter = createSprite(width / 2, height / 2);
    scoreCounter.visible = false;
    scoreCounter.addAnimation('1', scoreCounter1);
    scoreCounter.addAnimation('2', scoreCounter2);
    scoreCounter.addAnimation('3', scoreCounter3);
    slider = createSlider(0, 1, 0.7, 0.0001);
}


function draw() {
    background(wall);
    lobby_sound.setVolume(slider.value());
    if (gameState === "notStarted") {

        textSize(30);
        fill('yellow');
        text("Volume", 115, 280);
        slider.visible = true;
        slider.position(100, 300); // = { x: 100, y: 300 };
    } else {
        slider.visible = false;
    }
    if (mousePressedOver(startButton)) {
        gameState = "started";
    }
    if (mouseIsOver(startButton) || mouseIsOver(helpButton) || mouseIsOver(back)) {
        cursor('pointer');
    } else {
        cursor('default')
    }
    if (mousePressedOver(helpButton)) {
        gameState = "help";
    }
    if (mousePressedOver(back)) {
        gameState = "notStarted";
    }
    if (gameState === "prompt") {
        textSize(30);
        textFont('iras itc');
        text("Please enter you name: ", width / 2 - 50, height / 2 - 50);
        if (formState === "no") {
            var form = new Form();
            form.display();
        }
    }
    if (gameState === "help") {
        help.visible = true;
        help.x = width / 2;
        help.y = height / 2;
        back.x = bg.width - 150;
        back.visible = true;
    }
    //594003195136

    if (gameState === "notStarted") {
        if (lobby_sound.isPlaying() == false) {
            lobby_sound.play();
        }
        reloadPrompt.visible = true;
        reloadPrompt.scale = 0.5;
        reloadPrompt.x = width / 2;

        if (mousePressedOver(reloadPrompt)) {
            window.location.reload()
        }
        reloadPrompt.y =
            logo.y - 300;
        reloadPrompt.depth =
            logo.depth - 100;
        back.x = 100000;
    } else {
        reloadPrompt.visible = false;
        reloadPrompt.x = 1000;
    }
    if (gameState != 'help') {
        help.visible = false;
    }
    if (gameState != "notStarted") {
        startButton.x = 10000;
        helpButton.x = 10000;
        logo.x = 10000;
        slider.visible = false;
        slider.x = 1000
    } else {
        startButton.x = width / 2;
        startButton.y = height / 3 + height / 2 - 80;
        helpButton.x = width / 2;
        helpButton.y = height / 2 + height / 3 + 20
        logo.position = { x: width / 2, y: height / 2 - 100 }
        slider.visible = true;
        slider.x = 100;
    }
    console.log(sHealth, gameState);
    backMusic.setVolume(musicVolume);
    if (gameState == "started") {
        lobby_sound.pause();
        h1.visible = true;
        h2.visible = true;
        h3.visible = true;

        if (backMusic.isPlaying() == false) {
            backMusic.play();
        }
        if (frameCount % 20 === 0 && scoreCounterState === "normal") {
            var obstacle = new Enemy();
            e.push(obstacle);
        }
        if (frameCount % 600 === 0) {
            var addLife = new Life();
            l.push(addLife);
        }
        for (var i = 0; i < l.length; i++) {
            l[i].show();
            l[i].move();
        }
        for (var i = 0; i < e.length; i++) {
            if (rockState == "normal") {
                e[i].show();
                e[i].move();
            }
            if (e[i].collides(shooter)) {
                e[i].destroy();
                sHealth -= 1;
            }
        }
        bg.visible = true;
        bg.velocityY = 3;
        bg.scale = 0.5
        if (bg.y > height + 650) {
            bg.y = -630 + height
        }
        if (scoreCounterState === "normal") {
            shooter.visible = true;
        }
        shooter.setCollider("rectangle", -30, 10, 750, 500);
        shooter.scale = 0.2;
        shooter.frameDelay = 1;
        shooter.x = mouseX;
        if (keyIsDown(37) && shooter.x > 460 + shooter.width / 219) {
            shooter.x -= 30;
        }
        if (keyIsDown(39) && shooter.x < 1168 - (shooter.width / 3) - 10) {
            shooter.x += 30;
        }
        if (scoreCounterState == "normal") {
            for (var i = 0; i < b.length; i++) {
                b[i].show();
                b[i].move();
                for (var j = 0; j < e.length; j++) {
                    if (b[i].touches(e[j])) {
                        e[j].destroy();
                        b[i].destroy();
                        console.log("BURST INTO TEARS")
                    }
                }
                for (var q = 0; q < l.length; q++) {
                    if (b[i].addLife(l[q])) {
                        l[q].destroy();
                        b[i].destroy();
                    }
                }
            }
        }

        if (scoreCounterState === "notNormal") {
            shooter.visible = false;
            scoreCounter.visible = true;
            bg.visible = false;
            if (sHealth === 3) {
                scoreCounter.changeAnimation('3', scoreCounter3);
            } else if (sHealth === 2) {
                scoreCounter.changeAnimation('2', scoreCounter2);
            } else if (sHealth === 1) {
                scoreCounter.changeAnimation('1', scoreCounter1);
            }
            setTimeout(() => {
                scoreCounterState = "normal";
                bg.visible = true;
            }, 5000);
        } else {
            scoreCounter.visible = false;
        }
        // if (score === 25) {
        //     scoreCounterState = "notNormal";
        // }
//         text(bulletState + ' ' + sHealth, 0, 400);
        textSize(35);
        fill("lightgreen");
        textStyle(BOLD)
        textFont('comfortaa');
        text("Your Score: " + score, 50, 100);
    } else {
        h1.visible = false;
        h2.visible = false;
        h3.visible = false;
    }
    if (sHealth === 0) {
        gameState = "end";
    }

    if (gameState === "end") {
        if (mouseIsPressed) {
            window.location.reload();
        }
        if (bg.velocityY > 0) {
            bg.velocityY = bg.velocityY - 0.06;
            shooter.scale = shooter.scale - 0.006;
            shooter.velocityY = 10;
            musicVolume -= 0.02;
        }
        if (bg.velocityY <= 0) {
            bg.visible = false;
            musicVolume = 0; {
                setTimeout(() => {
                    if (lose_background.isPlaying() == false) {

                        lose_background.play();
                        lose_background.onended(() => {
                            lose_background.setVolume(0);
                        })
                    }
                }, 300);
            }
            textFont("comfortaa");
            textSize(120);
            fill('yellow')
            text("Final Score: " + score, (width / 2) - 400, height / 4);
            textStyle(BOLD);
            imageMode(CENTER);
            image(ended, width / 2, height / 2);
        }
        if (bg.velocityY > 0) {
            bg.scale = bg.scale + 0.001;

        }
        if (bg.scale > 0.6) {
            bg.velocityY = 0;
            if (lose.isPlaying() === false && loseTimer === 0) {
                lose.play();
                loseTimer = 1;
            }
        }

        setTimeout(() => {
            back.x = bg.width - 150;
            back.visible = true;
        }, 3000);
    }
    if (bulletState === "fired") {
        setTimeout(() => {
            bulletState = "notFired";
        }, 300);
    }
    if (sHealth === 3) {
        h1.changeAnimation('health1', healthAnimation);
        h2.changeAnimation('health2', healthAnimation);
        h3.changeAnimation('health3', healthAnimation);
    }
    if (sHealth === 2) {
        h3.changeAnimation('outline3', noHealth);
        h2.changeAnimation('health2', healthAnimation);
        h1.changeAnimation('health1', healthAnimation);
    }
    if (sHealth === 1) {
        h3.changeAnimation('outline3', noHealth);
        h2.changeAnimation('outline2', noHealth);
        h1.changeAnimation('health1', healthAnimation);
    }
    if (sHealth === 0) {
        h3.changeAnimation('outline3', noHealth);
        h2.changeAnimation('outline2', noHealth);
        h1.changeAnimation('outline1', noHealth);
    }
    drawSprites();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    startButton.y -= 100;
    helpButton.y -= 100;
}

function keyPressed() {
    if (keyCode === 32) {
        if (bulletState === "notFired" && gameState === "started" && scoreCounterState === "normal") {
            var b1 = new Bullets(shooter.x, shooter.y, e);
            b.push(b1);

            if (score < 25) {
                shoot.play();
                shoot.setVolume(0.2);
            } else if (score >= 25 && score < 50) {
                shoot3.play();
                shoot3.setVolume(2)
            } else if (score >= 50) {
                shoot2.play();
                shoot2.setVolume(0.5)
            }
            bulletState = "fired";
        }
    }
}
