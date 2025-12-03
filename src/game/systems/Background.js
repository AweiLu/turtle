class Layer {
    constructor(game, width, height, speedModifier, color) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }

    update(deltaTime) {
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x -= this.game.speed * this.speedModifier;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillRect(this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1920; // Virtual width
        this.height = 1080;
        this.layer1 = new Layer(this.game, this.width, this.height, 0.2, '#006994'); // Deep water
        this.layer2 = new Layer(this.game, this.width, this.height, 0.5, '#007AA5'); // Mid water
        // We can add more complex drawing logic to layers later (e.g. seaweed)

        // Procedural "Seaweed" or "Rocks" for layer 3
        this.layer3x = 0;
        this.layer3Speed = 2;
    }

    update(deltaTime) {
        // Simple scrolling for now, can be enhanced
        this.layer3x -= this.layer3Speed;
        if (this.layer3x <= -this.game.width) this.layer3x = 0;
    }

    draw(context) {
        // Gradient Background
        const gradient = context.createLinearGradient(0, 0, 0, this.game.height);
        gradient.addColorStop(0, "#00a8cc");
        gradient.addColorStop(1, "#00334e");
        context.fillStyle = gradient;
        context.fillRect(0, 0, this.game.width, this.game.height);

        // Draw some distant shapes/bubbles
        context.fillStyle = "rgba(255, 255, 255, 0.1)";
        for (let i = 0; i < 20; i++) {
            context.beginPath();
            context.arc((this.layer3x + i * 200) % this.game.width + this.game.width, 100 + Math.random() * 500, Math.random() * 20 + 10, 0, Math.PI * 2);
            context.fill();
        }

        // Floor
        context.fillStyle = "#c2b280"; // Sand
        context.fillRect(0, this.game.height - 50, this.game.width, 50);
    }
}
