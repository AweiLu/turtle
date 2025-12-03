export class Turtle {
    constructor(game) {
        this.game = game;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.width = 40;
        this.height = 30;
        this.speed = 5;
        this.angle = 0;
        this.velocity = { x: 0, y: 0 };
    }

    update(input) {
        // Smooth movement towards mouse
        const dx = input.mouse.x - this.x;
        const dy = input.mouse.y - this.y;

        // Calculate distance
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Only move if not super close to avoid jitter
        if (dist > 5) {
            this.x += dx * 0.05;
            this.y += dy * 0.05;
            this.angle = Math.atan2(dy, dx);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Simple Turtle Shape (Placeholder for now)
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.ellipse(0, 0, 30, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#27ae60';
        ctx.beginPath();
        ctx.arc(30, 0, 12, 0, Math.PI * 2);
        ctx.fill();

        // Flippers
        ctx.fillStyle = '#27ae60';
        // Front Left
        ctx.beginPath();
        ctx.ellipse(10, -20, 15, 8, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        // Front Right
        ctx.beginPath();
        ctx.ellipse(10, 20, 15, 8, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}
