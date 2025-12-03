import { Turtle } from './entities/Turtle.js';
import { InputHandler } from './InputHandler.js';
import { Background } from './systems/Background.js';
import { Obstacle } from './entities/Obstacle.js';
import { ParticleSystem } from './systems/ParticleSystem.js';
import { Collectible } from './entities/Collectible.js';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = this.canvas.getContext('2d');

        this.input = new InputHandler();
        this.background = new Background(this);
        this.turtle = new Turtle(this);
        this.particles = new ParticleSystem(this);

        this.obstacles = [];
        this.obstacleTimer = 0;
        this.obstacleInterval = 1500;

        this.collectibles = [];
        this.collectibleTimer = 0;
        this.collectibleInterval = 2000;

        this.score = 0;
        this.gameOver = false;
        this.gameStarted = false;

        this.resize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', e => {
            this.resize(e.target.innerWidth, e.target.innerHeight);
        });

        // UI Elements
        this.scoreElement = document.getElementById('score');
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.finalScoreElement = document.getElementById('final-score');

        // Start loop
        this.lastTime = 0;
        this.animate(0);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }

    update(deltaTime) {
        if (!this.gameStarted) {
            if (this.input.isDown(' ')) {
                this.startGame();
            }
            return;
        }

        if (this.gameOver) {
            if (this.input.isDown(' ')) {
                this.restartGame();
            }
            return;
        }

        this.background.update(deltaTime);
        this.turtle.update(deltaTime);
        this.particles.update(deltaTime);

        // Obstacles
        if (this.obstacleTimer > this.obstacleInterval) {
            this.obstacles.push(new Obstacle(this));
            this.obstacleTimer = 0;
        } else {
            this.obstacleTimer += deltaTime;
        }

        this.obstacles.forEach(obstacle => {
            obstacle.update(deltaTime);
            if (this.checkCollision(this.turtle, obstacle)) {
                this.endGame();
            }
        });
        this.obstacles = this.obstacles.filter(obstacle => !obstacle.markedForDeletion);

        // Collectibles
        if (this.collectibleTimer > this.collectibleInterval) {
            this.collectibles.push(new Collectible(this));
            this.collectibleTimer = 0;
        } else {
            this.collectibleTimer += deltaTime;
        }

        this.collectibles.forEach(collectible => {
            collectible.update(deltaTime);
            if (this.checkCollision(this.turtle, collectible)) {
                collectible.markedForDeletion = true;
                this.score += 10; // Bonus points
                // Add sparkle effect?
                for (let i = 0; i < 5; i++) this.particles.addParticle(collectible.x, collectible.y);
            }
        });
        this.collectibles = this.collectibles.filter(collectible => !collectible.markedForDeletion);

        // Score
        this.score += deltaTime * 0.01;
        this.scoreElement.innerText = 'Score: ' + Math.floor(this.score);
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);

        this.background.draw(this.context);
        this.particles.draw(this.context);
        this.turtle.draw(this.context);

        this.obstacles.forEach(obstacle => obstacle.draw(this.context));
        this.collectibles.forEach(collectible => collectible.draw(this.context));
    }

    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.animate.bind(this));
    }

    startGame() {
        this.gameStarted = true;
        this.gameOver = false;
        this.score = 0;
        this.obstacles = [];
        this.collectibles = [];
        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
    }

    endGame() {
        this.gameOver = true;
        this.gameOverScreen.classList.remove('hidden');
        this.finalScoreElement.innerText = Math.floor(this.score);
    }

    restartGame() {
        this.startGame();
        this.turtle.reset();
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }
}

window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    new Game(canvas);
});
