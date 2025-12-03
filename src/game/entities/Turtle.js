export class Turtle {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 40;
        this.x = 100;
        this.y = this.game.height / 2;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;
    }

    update(deltaTime) {
        if (this.game.input.isDown('ArrowUp') || this.game.input.isDown('w')) {
            this.speedY = -this.maxSpeed;
        } else if (this.game.input.isDown('ArrowDown') || this.game.input.isDown('s')) {
            this.speedY = this.maxSpeed;
        } else {
            this.speedY = 0;
        }

        if (this.game.input.isDown('ArrowLeft') || this.game.input.isDown('a')) {
            this.speedX = -this.maxSpeed;
        } else if (this.game.input.isDown('ArrowRight') || this.game.input.isDown('d')) {
            this.speedX = this.maxSpeed;
        } else {
            this.speedX = 0;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

        // Emit particles
        if (this.speedX !== 0 || this.speedY !== 0) {
            this.game.particles.addParticle(this.x + this.width * 0.2, this.y + this.height * 0.5);
        }
    }

    reset() {
        this.x = 100;
        this.y = this.game.height / 2;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw(context) {
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Rotate slightly based on vertical movement
        const rotation = this.speedY * 0.05;
        context.rotate(rotation);

        // Legs (Flippers)
        context.fillStyle = '#27ae60';
        // Front Left
        context.beginPath();
        context.ellipse(15, -15, 15, 8, Math.PI / 4, 0, Math.PI * 2);
        context.fill();
        // Front Right
        context.beginPath();
        context.ellipse(15, 15, 15, 8, -Math.PI / 4, 0, Math.PI * 2);
        context.fill();
        // Back Left
        context.beginPath();
        context.ellipse(-15, -15, 10, 6, -Math.PI / 4, 0, Math.PI * 2);
        context.fill();
        // Back Right
        context.beginPath();
        context.ellipse(-15, 15, 10, 6, Math.PI / 4, 0, Math.PI * 2);
        context.fill();

        // Head
        context.fillStyle = '#2ecc71';
        context.beginPath();
        context.ellipse(25, 0, 12, 10, 0, 0, Math.PI * 2);
        context.fill();

        // Eye
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(30, -4, 3, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = 'black';
        context.beginPath();
        context.arc(31, -4, 1, 0, Math.PI * 2);
        context.fill();

        // Shell
        context.fillStyle = '#16a085';
        context.beginPath();
        context.ellipse(0, 0, 25, 20, 0, 0, Math.PI * 2);
        context.fill();

        // Shell Pattern
        context.strokeStyle = '#0e6655';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(0, 0, 15, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.moveTo(-15, 0);
        context.lineTo(15, 0);
        context.stroke();
        context.beginPath();
        context.moveTo(0, -15);
        context.lineTo(0, 15);
        context.stroke();

        context.restore();
    }
}
