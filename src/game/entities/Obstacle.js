export class Obstacle {
    constructor(game, x, y, type = 'TRASH') {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = type === 'SHARK' ? 50 : 30;
        this.speed = type === 'SHARK' ? 4 : (Math.random() * 2 + 1);
        this.angle = type === 'SHARK' ? Math.PI : (Math.random() * Math.PI * 2); // Sharks swim left

        // Mine wobble
        this.wobble = 0;
    }

    update(deltaTime) {
        if (this.type === 'MINE') {
            this.wobble += 0.05;
            this.x -= 1; // Drifts slowly left
            this.y += Math.sin(this.wobble) * 0.5;
        } else if (this.type === 'SHARK') {
            this.x -= this.speed;
            // Simple homing if close
            const dy = this.game.turtle.y - this.y;
            if (Math.abs(dy) < 200) {
                this.y += Math.sign(dy) * 0.5;
            }
        } else {
            // Trash
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === 'MINE') {
            ctx.fillStyle = '#444';
            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, Math.PI * 2);
            ctx.fill();
            // Spikes
            for (let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI / 4);
                ctx.beginPath();
                ctx.moveTo(15, -5);
                ctx.lineTo(30, 0);
                ctx.lineTo(15, 5);
                ctx.fill();
            }
            // Red light
            ctx.fillStyle = `rgba(255, 0, 0, ${Math.abs(Math.sin(performance.now() * 0.005))})`;
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fill();

        } else if (this.type === 'SHARK') {
            ctx.scale(-1, 1); // Face left
            ctx.fillStyle = '#667788';
            // Body
            ctx.beginPath();
            ctx.ellipse(0, 0, 50, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            // Tail
            ctx.beginPath();
            ctx.moveTo(40, 0);
            ctx.lineTo(70, -20);
            ctx.lineTo(70, 20);
            ctx.fill();
            // Fin
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(10, -35);
            ctx.lineTo(20, -10);
            ctx.fill();
            // Eye
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(-30, -5, 3, 0, Math.PI * 2);
            ctx.fill();

        } else {
            // TRASH (Red Triangle)
            ctx.fillStyle = '#ff4444';
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size, this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.fill();
        }

        ctx.restore();
    }
}
