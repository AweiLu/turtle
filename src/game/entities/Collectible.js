export class Collectible {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = 15;
        this.collected = false;
        this.wobble = Math.random() * Math.PI * 2;
    }

    update(deltaTime) {
        this.wobble += 0.05;
    }

    draw(ctx) {
        if (this.collected) return;
        ctx.save();
        ctx.translate(this.x, this.y + Math.sin(this.wobble) * 5);

        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffff00';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }
}
