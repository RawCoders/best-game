import config from './Config';
import Character from './Character';
import Keyboard from './Keyboard';

export default class Warrior extends Character {
    constructor(spl, position, name, lives) {
        super(spl, position);

        this.sprite = 'warrior';
        this.action = 'walk_down';

        this.lives = lives;
        this.hp = 100;

        this.name = name || 'player one';

        this.end = false;

        this.keyboard = this.game.keyboard;
    }

    update_values() {
        let pos = this.pos;
        if (window.water[pos[0]][pos[1]] && this.active === true) {
            pos[1]++;
            this.lives--;
            this.active = false;
            this.sprite = 'overworld';
            this.action = 'water_splashing';
        }

        if (this.active) {

            if (this.keyboard.up_pressed) {
                pos[1] = pos[1] - 1;
                if (pos[1] < 0) pos[1] = 0;

                this.action = 'walk_up';
            } else if (this.keyboard.down_pressed) {
                pos[1] = pos[1] + 1;
                if (pos[1] > config.world[1] - 2) pos[1] = config.world[1] - 2;

                this.action = 'walk_down';
            } else if (this.keyboard.left_pressed) {
                pos[0] = pos[0] - 1;
                if (pos[0] < 0) pos[0] = 0;

                this.action = 'walk_left';
            } else if (this.keyboard.right_pressed) {
                pos[0] = pos[0] + 1;
                if (pos[0] > config.world[0] - 1) pos[0] = config.world[0] - 1;

                this.action = 'walk_right';
            } else if (this.is_near_enemy() && this.facing_enemy()) {
                console.log('enemy here')
            } else {
                this.next_frame = 0;
            }

        } else {
            // Dying state(drowning, ): No keyboard actions 
            if (this.next_frame === 0) {
                this.end = true;
            }

        }
    }

    draw_name() {
        const name = this.name;
        // clean this up later
        const [canvas_x, canvas_y] = [this.pos[0] - window.camera[0], this.pos[1] - window.camera[1]];
        this.spl.drawText(name, canvas_x * 2 - name.length / 2 + 1, (canvas_y - 1) * 2, { scale: 1 });
    }

    is_near_enemy() {
        const nearby = [
            [[-1, -1], [0, -1], [1, -1]],
            [[-1, 0], [0, 0], [1, 0]],
            [[-1, 1], [0, 1], [1, 1]],
        ];

        for (let row of nearby) {
            for (let col of row) {
                const tile = [this.pos[0] + col[0], this.pos[1] + col[1]];

                if (this.world.is_enemy_on_tile(tile)) {
                    return true;
                }
            }
        }
    }

    facing_enemy() {
        return true;
    }

    draw() {
        super.draw();
        this.draw_name();
        window.warrior_pos = this.pos;
        return this.pos;
    }
}