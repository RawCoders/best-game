import config from './Config';
import Keyboard from './Keyboard';
import SpriteLoader from './SpriteLoader';
import World from './World';
import Warrior from './Warrior';
import WarriorData from './WarriorData';
import OtherWarrior from './OtherWarrior';
import Enemy from './Enemy';
import WelcomeScreen from './WelcomeScreen';
import GameOverScreen from './GameOverScreen';
import io from 'socket.io-client';

let game = null;
let world = null;

class Game {
    constructor() {
        this.setup_canvas();
        this.setup_config();
        this.setup_keyboard();
        this.setup_socket();
        this.bind_stop();
    }

    init() {
        this.setup_sprites()
            .then(() => {
                this.start_new_game();
            });
    }
  
    start_new_game(lives = 3) {
        if(!this.game_started) {
            this.setup_welcome_screen();
            this.setup_game_over_screen();
        }
        this.setup_world();
        this.setup_warrior(lives);
        this.setup_enemy();
        this.start_loop();
    }

    setup_canvas() {
        this.canvas = document.getElementById('canvas');
        const { width, height } = config.canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
    }

    start_loop() {
        this.game_loop = setInterval(this.draw.bind(this), this.o.frameRate);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.o.canvas_width, this.o.canvas_height);
        if (!this.game_started) {
            if(this.game_over) {
                this.game_over_screen.draw(); 
            } else {
                this.welcome_screen.draw();
            }
        } else {
            // TODO: don't start a new game on warrior death
            if(this.warrior.end === true) {
                if(this.warrior.lives > 0) {
                   clearInterval(this.game_loop); 
                   this.start_new_game(this.warrior.lives);
                } else {
                   this.game_started = false;
                   this.game_over = true;
                }
            }
            this.reset_obstacles();

            this.world.draw(this.char_pos);

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
            
            // obstacles over players
            this.world.draw_obstacles();
            
            // warrior data over everything else
            this.warrior_data.draw();
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
                    pos: [Math.floor(config.camera[0] / 2), Math.floor(config.camera[1] / 2)]
                });
            }
        });
    }
  
    setup_game_over_screen() {
        this.game_over_screen = new GameOverScreen(this.spl, {
            on_game_restart: () => {
                this.game_over = false;
                this.game_started = false;
                clearInterval(this.game_loop); 
                this.start_new_game();
            }
        });
    }

    setup_world() {
        this.world = new World(this.spl, this.keyboard);
        // to export it to other entities
        world = this.world;
    }

    setup_warrior(lives) {
        this.warrior = new Warrior(
            this.spl,
            [Math.floor(config.world[0] / 2), Math.floor(config.world[1] / 2)],
            this.player_name,
            lives
        );
        this.setup_warrior_data();
    }
  
    setup_warrior_data() {
        this.warrior_data = new WarriorData(this.spl, this.warrior);
    }

    setup_enemy() {
        this.enemy_1 = new Enemy(this.spl, [Math.floor(config.world[0]) - 2, 2], 1/2);
        this.enemy_2 = new Enemy(this.spl, [2, Math.floor(config.world[1]) - 2], 1/2);
    }

    setup_config() {
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
        for (let i = 0; i < config.world[0]; i++) {
            window.obstacles[i] = [];
            for (let j = 0; j < config.world[1]; j++) {
                window.obstacles[i][j] = 0;
            }
        }

        window.enemy = [];
        for (let i = 0; i < config.world[0]; i++) {
            window.enemy[i] = [];
            for (let j = 0; j < config.world[1]; j++) {
                window.enemy[i][j] = 0;
            }
        }
      
        window.water = [];
        for (let i = 0; i < config.world[0]; i++) {
            window.water[i] = [];
            for (let j = 0; j < config.world[1]; j++) {
                window.water[i][j] = 0;
            }
        }
    }
  
    info() {
      return this;
    }
}

game = new Game();
game.init();

export function get_game() {
    return game;
}

export function get_world() {
    return world;
}

window.game = game;