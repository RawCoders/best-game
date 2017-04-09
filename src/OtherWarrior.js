import config from './Config';
import Warrior from './Warrior';

export default class OtherWarrior extends Warrior {
    constructor(spl, position, name) {
        super(spl, position);

        this.sprite = 'warrior';
        this.action = 'walk_down';
        this.keyboard = null;

        this.name = name || 'other player one';
    }

    update_values(pos, action, next_frame) {
        this.pos = pos || this.pos;
        this.action = action || this.action;
        this.next_frame = next_frame || this.next_frame;
    }
}