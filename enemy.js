class Enemy {
    constructor() {
        this.x = random(460, 1168 - 100);
        this.y = -50;
        this.rock = createsprite(this.x, this.y, 100, 100);
        this.rock.addAnimation('rock', rockAnimation);
        this.rock.frameDelay = 0.1;
        this.rock.lifetime = 130;
    }
    show() {
        if (scoreCounterState === "normal") {
            this.rock.addAnimation('rock', rockAnimation);
            this.rock.scale = 0.2;
            this.rock.setCollider("circle", 0, 0, 240);
        }
        // this.rock.debug = true;
    }
    move() {
        this.rock.velocityY = 8
    }
    stop() {
        setTimeout(() => {
            this.rock.destroy();
        }, 1000);
    }
    collides(enemy) {
        this.enemy = enemy;
        if (this.rock.isTouching(shooter)) {
            this.rock.destroy();
            sHealth -= 1;
            setTimeout(() => {
                if (loseSound.isPlaying() == false && sHealth == 0) {
                    loseSound.play();
                }
            }, 250);
        }
    }
}