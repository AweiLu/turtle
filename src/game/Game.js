import { Renderer } from './Renderer.js';
import { InputHandler } from './InputHandler.js';
import { Turtle } from './entities/Turtle.js';
import { ParticleSystem } from './systems/ParticleSystem.js';
import { Obstacle } from './entities/Obstacle.js';
import { Collectible } from './entities/Collectible.js';

export class Game {
    constructor() {
        this.renderer = new Renderer('gameCanvas');
        this.input = new InputHandler();
        this.turtle = new Turtle(this);
        this.particles = new ParticleSystem();
        this.obstacles = [];
        this.collectibles = [];
        this.lastTime = 0;
        this.isRunning = false;
        this.score = 0;
        this.spawnTimer = 0;

        // Camera
        this.camera = { x: 0, y: 0 };
    }

    start() {
        if (this.isRunning) return;
        this.reset();
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame((ts) => this.loop(ts));

        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('score').innerText = 'Score: 0';
    }

    reset() {
        this.turtle = new Turtle(this);
        this.obstacles = [];
        this.collectibles = [];
        this.particles = new ParticleSystem();
        this.score = 0;
        this.spawnTimer = 0;
        this.camera = { x: 0, y: 0 };
    }

    loop(timestamp) {
        if (!this.isRunning) return;
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((ts) => this.loop(ts));
    }

    update(deltaTime) {
        this.turtle.update(this.input);
        this.particles.update(deltaTime);

        // Camera follows turtle
        this.camera.x = this.turtle.x;
        this.camera.y = this.turtle.y;

        // Spawning
        this.spawnTimer += deltaTime;
        if (this.spawnTimer > 1000) { // Every second
            this.spawnTimer = 0;
            this.spawnEntity();
        }

        // Update Entities
        this.obstacles.forEach(o => o.update(deltaTime));
        this.collectibles.forEach(c => c.update(deltaTime));

        // Cleanup off-screen (simple distance check from turtle)
        this.obstacles = this.obstacles.filter(o => this.getDist(o, this.turtle) < 2000);
        this.collectibles = this.collectibles.filter(c => this.getDist(c, this.turtle) < 2000);

        this.checkCollisions();
    }

    spawnEntity() {
        const angle = Math.random() * Math.PI * 2;
        const dist = 800; // Spawn outside screen
        const x = this.turtle.x + Math.cos(angle) * dist;
        const y = this.turtle.y + Math.sin(angle) * dist;

        if (Math.random() < 0.3) {
            this.collectibles.push(new Collectible(this, x, y));
        } else {
            this.obstacles.push(new Obstacle(this, x, y));
        }
    }

    getDist(e1, e2) {
        const dx = e1.x - e2.x;
        const dy = e1.y - e2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    checkCollisions() {
        // Collectibles
        for (let i = this.collectibles.length - 1; i >= 0; i--) {
            const c = this.collectibles[i];
            if (this.getDist(c, this.turtle) < c.size + this.turtle.width / 2) {
                this.score += 10;
                document.getElementById('score').innerText = `Score: ${this.score}`;
                this.particles.emit(c.x, c.y, 'sparkle');
                this.collectibles.splice(i, 1);
            }
        }

        // Obstacles
        for (const o of this.obstacles) {
            if (this.getDist(o, this.turtle) < o.size + this.turtle.width / 3) {
                this.gameOver();
            }
        }
    }

    gameOver() {
        this.isRunning = false;
        const startScreen = document.getElementById('start-screen');
        startScreen.style.display = 'block';
        startScreen.innerHTML = `<h1>Game Over</h1><p>Score: ${this.score}</p><p>Press Enter to Restart</p>`;
    }

    draw() {
        this.renderer.draw((ctx) => {
            this.particles.draw(ctx);
            this.obstacles.forEach(o => o.draw(ctx));
            this.collectibles.forEach(c => c.draw(ctx));
            this.turtle.draw(ctx);
        }, this.camera.x, this.camera.y);
    }
}
