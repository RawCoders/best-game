import meta from './Meta';
import Character from './Character';
import Keyboard from './Keyboard';

export default class Warrior extends Character {
    constructor(spl, initial_position, name) {
        super(spl, initial_position);

        this.keyboard = new Keyboard();
        this.sprite = 'warrior';
        this.action = 'walk_down';

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

    draw() {
        super.draw();
        this.draw_name();
        return this.pos;
    }
}