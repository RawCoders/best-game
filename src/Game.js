import meta from './Meta';
import Keyboard from './Keyboard';
import SpriteLoader from './SpriteLoader';
import Map from './Map';
import Warrior from './Warrior';
import OtherWarrior from './OtherWarrior';
import Enemy from './Enemy';
import WelcomeScreen from './WelcomeScreen';
import io from 'socket.io-client';

class Game {
    constructor() {
        this.setup_canvas();
        this.setup_variables();
        this.setup_keyboard();
        this.setup_socket();
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
        if (!this.game_started) {
            this.welcome_screen.draw();
        } else {
            this.reset_obstacles();

            this.map.draw(this.char_pos);

            this.warrior.name = this.player_name;
            this.char_pos = this.warrior.draw();
            this.socket.emit('other_player_update_value', {
                name: this.warrior.name,
                pos: this.warrior.pos,
                action: this.warrior.action,
                next_frame: this.warrior.next_frame
            });

            if (this.other_players.length > 0) {
                this.other_players.forEach(player => {
                    player.draw();
                });
            }

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
            on_gamestart: (player_name) => {
                this.player_name = player_name;
                this.game_started = true;

                this.socket.emit('new_client', {
                    name: player_name,
                    pos: [Math.floor(meta.camera[0] / 2), Math.floor(meta.camera[1] / 2)]
                });
            }
        });
    }

    setup_map() {
        this.map = new Map(this.ctx, this.spl);
    }

    setup_warrior() {
        this.warrior = new Warrior(
            this.spl,
            [Math.floor(meta.map[0] / 2), Math.floor(meta.map[1] / 2)],
            this.player_name
        );
    }

    setup_enemy() {
        this.enemy_1 = new Enemy(this.spl, [Math.floor(meta.map[0]) - 2, 2], 1/2);
        this.enemy_2 = new Enemy(this.spl, [2, Math.floor(meta.map[1]) - 2], 1/2);
    }

    setup_variables() {
        this.o = {
            canvas_height: this.canvas.height,
            canvas_width: this.canvas.width,
            frameRate: 1000 / 8,
            frame: 0
        }
        this.game_started = false;
        this.other_players = [];
    }

    setup_socket() {
        this.socket = io.connect(window.location.href);
        this.socket.on('player_joined', (player) => {
            console.log(player, 'joined');

            this.other_players.push(new OtherWarrior(this.spl, player.pos, player.name));
        });

        this.socket.on('other_player_update_value_from_server', player_info => {
            this.update_other_player(player_info);
        });
    }

    update_other_player(player_info) {
        const player = this.other_players.find(player => player_info.name === player.name);
        if (player) {
            player.update_values(player_info.pos, player_info.action, player_info.next_frame);
        }
    }

    bind_stop() {
        document.getElementById('stop').addEventListener('click', () => {
            clearInterval(this.game_loop);
        });
    }

    reset_obstacles() {
        window.obstacles = [];
        for (let i = 0; i < meta.map[0]; i++) {
            window.obstacles[i] = [];
            for (let j = 0; j < meta.map[1]; j++) {
                window.obstacles[i][j] = 0;
            }
        }

        window.enemy = [];
        for (let i = 0; i < meta.map[0]; i++) {
            window.enemy[i] = [];
            for (let j = 0; j < meta.map[1]; j++) {
                window.enemy[i][j] = 0;
            }
        }
    }
}

let game = new Game();
game.init();