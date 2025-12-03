class Particle {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -1 - 0.5; // Float up
        this.color = 'rgba(255, 255, 255, 0.5)';
        this.markedForDeletion = false;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95; // Shrink
        if (this.size < 0.5) this.markedForDeletion = true;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

export class ParticleSystem {
    constructor(game) {
        this.game = game;
        this.particles = [];
    }

    addParticle(x, y) {
        this.particles.push(new Particle(this.game, x, y));
    }

    update(deltaTime) {
        this.particles.forEach(particle => particle.update());
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);
    }

    draw(context) {
        this.particles.forEach(particle => particle.draw(context));
    }
}
