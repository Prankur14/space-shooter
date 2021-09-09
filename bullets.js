class Bullets {
    constructor(x, y, enemy) {
        this.x = x;
        this.y = y;
        this.enemy = enemy;
        if (bulletState === "notFired") {
            this.bullet = createsprite(this.x, this.y);
        }
        this.bullet.addAnimation('bullet', bulletAnimation);
        this.bullet.addAnimation('changed', bulletAnimation2);
        this.bullet.addAnimation('3', bulletAnimation3);
        this.blastCacl = Math.round(random(1, 3));
        this.bullet.scale = 1;
        this.blastSound;
        if (this.blastCacl === 1) {
            this.blastSound = blast1;
        } else if (this.blastCacl === 2) {
            this.blastSound = blast2;
        } else if (this.blastCacl === 3) {
            this.blastSound = blast3;
        }
    }
    show() {
        if (scoreCounterState === "normal") {
            this.bullet.depth = shooter.depth - 1;
            if (score < 25) {
                this.bullet.scale = 1.5;
                this.bullet.setCollider('rectangle', 0, 0, 20, 40);
                this.bullet.addAnimation('bullet', bulletAnimation);
            } else if (score >= 25 && score < 50) {
                this.bullet.scale = 0.3;
                this.bullet.changeAnimation('changed', bulletAnimation2);
                this.bullet.frameDelay = 1;
                this.bullet.setCollider("circle", -4, -207, 50);
            } else if (score >= 50) {
                this.bullet.changeAnimation('3', bulletAnimation3);
                this.bullet.setCollider('circle', -1, -19, 5);
            }
        }
        // this.bullet.debug = true;
    }
    move() {
        if (score < 25) {
            this.bullet.velocityY = -35;
        } else if (score >= 25 && score < 50) {
            this.bullet.velocityY = -15;
        } else if (score >= 50) {
            this.bullet.velocityY = -23;
        }
        if (this.bullet.y < -80) {
            this.bullet.destroy();
        }
        if (this.enemy.y > height) {
            this.enemy.destroy();
        }
    }
    touches(enemy) {
        this.enemy = enemy;
        if (this.bullet.isTouching(this.enemy.rock)) {
            this.bullet.destroy();
            score++;
            this.enemy.rock.destroy();
            this.enemy.rock.frameDelay = 2;
            this.blastSound.play();
        }
    }
    addLife(friend) {
        this.friend = friend;
        if (this.bullet.isTouching(this.friend.life)) {
            this.bullet.destroy();
            this.friend.life.destroy();
            if (sHealth < 3) { sHealth += 1; }
        }
    }
}