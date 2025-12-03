export class Collectible {
    constructor(game) {
        this.game = game;
        this.width = 30;
        this.height = 30;
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height - 100);
        this.speedX = -2;
        this.markedForDeletion = false;
        this.angle = 0;
    }

    update(deltaTime) {
        this.x += this.speedX;
        this.angle += 0.1;
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(context) {
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.angle);
        context.fillStyle = 'gold';
        context.beginPath();
        // Draw Star
        for (let i = 0; i < 5; i++) {
            context.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 15,
                -Math.sin((18 + i * 72) * Math.PI / 180) * 15);
            context.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 7,
                -Math.sin((54 + i * 72) * Math.PI / 180) * 7);
        }
        context.closePath();
        context.fill();
        context.restore();
    }
}
