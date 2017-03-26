import meta from './Meta';
import Character from './Character';
import Keyboard from './Keyboard';

export default class Warrior extends Character {
    constructor(spl, initial_position, name) {
        super(spl, initial_position);

        this.keyboard = new Keyboard();
        this.sprite = 'warrior';
        this.action = 'walk_down';
        this.hp = 100;

        this.name = name || 'player one';
    }

    update_values() {
        let pos = this.pos;

        if (this.keyboard.up_pressed) {
            pos[1] = pos[1] - 1;
            if (pos[1] < 0) pos[1] = 0;

            this.action = 'walk_up';
        } else if (this.keyboard.down_pressed) {
            pos[1] = pos[1] + 1;
            if (pos[1] > meta.map[1] - 2) pos[1] = meta.map[1] - 2;

            this.action = 'walk_down';
        } else if (this.keyboard.left_pressed) {
            pos[0] = pos[0] - 1;
            if (pos[0] < 0) pos[0] = 0;

            this.action = 'walk_left';
        } else if (this.keyboard.right_pressed) {
            pos[0] = pos[0] + 1;
            if (pos[0] > meta.map[0] - 1) pos[0] = meta.map[0] - 1;

            this.action = 'walk_right';
        } else if(this.is_near_enemy() && this.facing_enemy()){
            console.log('enemy here')
        } else {
            this.next_frame = 0;
        }
    }

    draw_name() {
        const name = this.name;
        // clean this up later
        const [canvas_x, canvas_y] = [this.pos[0] - window.camera[0], this.pos[1] - window.camera[1]];
        this.spl.drawText(name, canvas_x * 2 - name.length/2 + 1, (canvas_y - 1) * 2, { scale:1 });
    }

    is_near_enemy() {
        const nearby = [
            [[-1, -1], [0, -1], [1, -1]],
            [[-1, 0], [0, 0], [1, 0]],
            [[-1, 1], [0, 1], [1, 1]],
        ];

        console.log(this.pos[0] + 1, this.pos[1] + 0, window.enemy[this.pos[0] + 1][this.pos[1] + 0]);

        if(window.enemy[this.pos[0] + 1][this.pos[1] + 0]) {
            return true;
        }

        for(let row of nearby) {
            for(let col of row) {
                const tile = [this.pos[0] + col[0], this.pos[1] + col[1]];
                if(window.enemy[tile[0]][tile[1]]) {
                    return true;
                }
            }
        }
        // return false;
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