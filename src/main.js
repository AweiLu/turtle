import './style.css'
import { Game } from './game/Game.js';

const game = new Game();

// Listen for start
window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && !game.isRunning) {
        game.start();
    }
});
