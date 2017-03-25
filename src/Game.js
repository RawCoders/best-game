import meta from './Meta';
import Keyboard from './Keyboard';
import SpriteLoader from './SpriteLoader';
import Map from './Map';
import Warrior from './Warrior';
import Enemy from './Enemy';
import WelcomeScreen from './WelcomeScreen';

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
                this.start_game();
            });
    }

    start_game() {
        this.setup_welcome_screen();
        this.setup_map();
        this.setup_warrior();
        this.setup_enemy();
        this.start_loop();
    }

    setup_canvas() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = meta.canvas[0];
        this.canvas.height = meta.canvas[1];
        this.ctx = canvas.getContext('2d');
    }

    start_loop() {
        this.game_loop = setInterval(this.draw.bind(this), this.o.frameRate);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.o.canvas_width, this.o.canvas_height);
        if(!this.game_started) {
            this.welcome_screen.draw();
        } else {
            this.map.draw(this.char_pos);
            this.char_pos = this.warrior.draw();
            this.enemy_1.draw(this.warrior);
            this.enemy_2.draw(this.warrior);
        }
    }

    setup_sprites() {
        this.spl = new SpriteLoader(this.ctx);
        return this.spl.load();
    }

    setup_keyboard() {
        this.keyboard = new Keyboard();
    }

    setup_welcome_screen() {
        this.welcome_screen = new WelcomeScreen(this.spl, {
            on_gamestart: () => {
                this.game_started = true;
            }
        });
    }

    setup_map() {
        this.map = new Map(this.ctx, this.spl);
    }

    setup_warrior() {
        this.warrior = new Warrior(
            this.spl,
            [Math.floor(meta.camera[0]/2), Math.floor(meta.camera[1]/2)]
        );
    }

    setup_enemy() {
        this.enemy_1 = new Enemy(this.spl, [Math.floor(meta.camera[0])-2, 2], 1/2);
        this.enemy_2 = new Enemy(this.spl, [2, Math.floor(meta.camera[1])-2], 1/4);
    }

    setup_variables() {
        this.o = {
            canvas_height: this.canvas.height,
            canvas_width: this.canvas.width,
            frameRate: 1000/8,
            frame: 0
        }
        this.game_started = false;
    }

    bind_stop() {
        document.getElementById('stop').addEventListener('click', () => {
            clearInterval(this.game_loop);
        });
    }
}

let game = new Game();
game.init();