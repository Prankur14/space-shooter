class Life {
    constructor() {
        this.x = random(460, 1168 - 100);
        this.y = -50;
        this.life = createSprite(this.x, this.y);
        this.life.addAnimation('life', lifeAnimation);
        this.life.lifetime = 150;
        this.life.scale = 2.4;
    }
    show() {
        this.life.addAnimation('life', lifeAnimation);
        // this.life.debug = true;
    }
    move() {
        this.life.velocityY = 25;
    }
}