export class Obstacle {
    constructor(game) {
        this.game = game;
        this.width = Math.random() * 40 + 40;
        this.height = Math.random() * 40 + 40;
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height - this.height - 50); // Avoid floor
        this.speedX = Math.random() * -2 - 2;
        this.markedForDeletion = false;
        this.color = Math.random() > 0.5 ? '#ff6b6b' : '#feca57'; // Red or Yellow
        this.type = Math.random() > 0.5 ? 'box' : 'circle';
    }

    update(deltaTime) {
        this.x += this.speedX;
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(context) {
        context.fillStyle = this.color;
        if (this.type === 'box') {
            context.fillRect(this.x, this.y, this.width, this.height);
        } else {
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            context.fill();
        }
    }
}
