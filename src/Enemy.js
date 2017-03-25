import meta from './Meta';
import Character from './Character';

export default class Enemy extends Character {
    constructor(spl, pos, speed) {
        super(spl, pos);

        this.sprite = 'enemy'
        this.action = 'walk_down';
        this.speed = speed;
    }

    update_values(character) {
        let pos = this.pos;
        let speed = this.speed;
        if (character.pos[1] < pos[1]) {
            pos[1] = pos[1] - speed * 1;
            this.action = 'walk_up';
        } else if (character.pos[1] > pos[1]) {
            pos[1] = pos[1] + speed * 1;
            this.action = 'walk_down';
        } else if (character.pos[0] < pos[0]) {
            pos[0] = pos[0] - speed * 1;
            this.action = 'walk_left';
        } else if (character.pos[0] > pos[0]) {
            pos[0] = pos[0] + speed * 1;
            this.action = 'walk_right';
        } else {
            this.next_frame = 0;
        }
    }

    draw(character) {
        this.update_values = this.update_values.bind(this, character);
        super.draw();
    }
}
