export class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 0;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawBackground(scrollX, scrollY) {
        // Layer 1: Deep water gradient (Static relative to screen, but suggests depth)
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, '#001a33'); // Lighter blue at top
        gradient.addColorStop(1, '#000510'); // Dark at bottom
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Layer 2: Distant Particles/Plankton (Slow Parallax)
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(100, 255, 255, 0.1)';
        for (let i = 0; i < 50; i++) {
            // Pseudo-random positions based on index to keep them stable
            const x = ((i * 137.5) - scrollX * 0.2) % this.width;
            const y = ((i * 293.3) - scrollY * 0.2) % this.height;
            const drawX = x < 0 ? x + this.width : x;
            const drawY = y < 0 ? y + this.height : y;

            this.ctx.beginPath();
            this.ctx.arc(drawX, drawY, Math.random() * 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.restore();

        // Layer 3: God Rays (Overlay)
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'overlay';
        const rayGradient = this.ctx.createLinearGradient(this.width * 0.5, 0, this.width * 0.2, this.height);
        rayGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        rayGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.translate(this.width / 2, 0);
        this.ctx.rotate(Math.sin(performance.now() * 0.0005) * 0.1); // Subtle sway
        this.ctx.translate(-this.width / 2, 0);

        this.ctx.fillStyle = rayGradient;
        this.ctx.fillRect(-200, 0, this.width + 400, this.height);
        this.ctx.restore();
    }

    draw(callback, scrollX = 0, scrollY = 0) {
        this.clear();
        this.drawBackground(scrollX, scrollY);
        callback(this.ctx);
    }
}
