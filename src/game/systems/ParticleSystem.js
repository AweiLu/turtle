export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, type = 'bubble') {
        const particle = {
            x, y,
            type,
            vx: (Math.random() - 0.5) * (type === 'sparkle' ? 5 : 2),
            vy: type === 'bubble' ? -Math.random() * 2 - 1 : (Math.random() - 0.5) * 5,
            life: 1.0,
            size: Math.random() * 5 + 2,
            color: type === 'bubble' ? `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})` :
                type === 'sparkle' ? `rgba(255, 255, 0, ${Math.random()})` : 'orange'
        };
        this.particles.push(particle);
    }

    update(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            if (p.type === 'bubble') {
                p.x += Math.sin(p.y * 0.1 + performance.now() * 0.005) * 0.5; // Wobble
            }

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}
