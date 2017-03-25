import meta from './Meta';

export default class Enemy {
    constructor(spl, pos, speed) {
        this.spl = spl;
        this.next_frame = 0;
        this.pos = pos;
        this.action = 'walk_down';
        this.speed = speed;
    }

    draw(character) {
        let action = this.action;
        let pos = this.pos;
        let speed = this.speed;
        if (character.pos[1] < pos[1]) {
            pos[1] = pos[1] - speed*1;
            action = 'walk_up';
        } else if (character.pos[1] > pos[1]) {
            pos[1] = pos[1] + speed*1;
            action = 'walk_down';
        } else if (character.pos[0] < pos[0]) {
            pos[0] = pos[0] - speed*1;
            action = 'walk_left';
        } else if (character.pos[0] > pos[0]) {
            pos[0] = pos[0] + speed*1;
            action = 'walk_right';
        } else {
            this.next_frame = 0;
        }
        this.action = action;
        this.next_frame = this.spl.draw('enemy', action, pos[0], pos[1], this.next_frame);
    }
}
