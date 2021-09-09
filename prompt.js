function Form() {
    this.input = createInput();
    this.start = createSprite(width / 2, height / 2 + 170);
    this.input.placeholder = "Name"
    this.hide = function() {
        this.input.hide;

    }
    this.display = function() {

        this.input.position(width / 2 - 80, height / 2);
        if (mousePressedOver(this.start)) {
            gameState = "started";
        }
        // this.input`
    }

}