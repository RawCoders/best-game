import Keyboard from './Keyboard';
import SpriteLoader from './SpriteLoader';
import Map from './Map';

class Game {
    constructor() {
        this.setup_canvas();
        this.setup_variables();
        this.setup_keyboard();
        this.bind_stop();
    }

    init() {
        this.setup_sprites()
            .then(() => {
                this.setup_map();
                this.start_loop();
            });
    }

    setup_canvas() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.ctx = canvas.getContext('2d');
    }

    start_loop() {
        this.game_loop = setInterval(this.draw.bind(this), this.o.frameRate);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.o.canvas_width, this.o.canvas_height);
        this.map.draw();
    }

    setup_sprites() {
        this.spl = new SpriteLoader(this.ctx);
        return this.spl.load();
    }

    setup_keyboard() {
        this.keyboard = new Keyboard();
    }

    setup_map() {
        this.map = new Map(this.ctx, this.spl);
    }

    setup_variables() {
        this.o = {
            canvas_height: this.canvas.height,
            canvas_width: this.canvas.width,
            frameRate: 1000/8,
            frame: 0
        }
    }

    bind_stop() {
        document.getElementById('stop').addEventListener('click', () => {
            clearInterval(this.game_loop);
        });
    }
}

let game = new Game();
game.init();