import meta from './Meta';
import Keyboard from './Keyboard';

export default class Character {
    constructor(spl) {
        this.spl = spl;
        this.next_frame = 0;
        this.keyboard = new Keyboard();
        this.pos = [Math.floor(meta.camera[0]/2), Math.floor(meta.camera[1]/2)];
        this.action = 'walk_down';
    }

    draw() {
        let action = this.action;
        let pos = this.pos;
        if (this.keyboard.up_pressed) {
            pos[1] = pos[1] - 1;
            if (pos[1] < 0) pos[1] = 0;
            action = 'walk_up';
        } else if (this.keyboard.down_pressed) {
            pos[1] = pos[1] + 1;
            if (pos[1] > meta.camera[1] - 2) pos[1] = meta.camera[1] - 2;
            action = 'walk_down';
        } else if (this.keyboard.left_pressed) {
            pos[0] = pos[0] - 1;
            if (pos[0] < 0) pos[0] = 0;
            action = 'walk_left';
        } else if (this.keyboard.right_pressed) {
            pos[0] = pos[0] + 1;
            if (pos[0] > meta.camera[0] - 1) pos[0] = meta.camera[0] - 1;
            action = 'walk_right';
        } else {
            this.next_frame = 0;
        }
        this.action = action;
        this.next_frame = this.spl.draw('warrior', action, pos[0], pos[1], this.next_frame);
    }
}
