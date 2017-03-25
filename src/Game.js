import Keyboard from './Keyboard';
import Map from './Map';
import SpriteLoader from './SpriteLoader';

class Game {
    constructor() {
        this.setup_canvas();
        this.setup_variables();
        this.setup_keyboard();
        this.setup_sprites()
            .then(() => {
                this.setup_map();
            });
    }

    setup_canvas() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.ctx = canvas.getContext('2d');
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
        this.map.init();
    }

    setup_variables() {
        this.o = {
            canvas_height: this.canvas.height,
            canvas_width: this.canvas.width,
            frameRate: 1000/8,
            frame: 0
        }
    }
}

let game = new Game();