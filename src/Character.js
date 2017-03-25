import meta from './Meta';

export default class Character {
    constructor(spl, inital_position) {
        this.spl = spl;

        this.next_frame = 0;
        this.pos = inital_position;
        this.sprite = 'override_me';
        // this.pos = [Math.floor(meta.camera[0]/2), Math.floor(meta.camera[1]/2)];
        this.action = 'walk_down';
    }

    update_values() {
        // update this.pos, this.action or any decision variable here
    }

    draw() {
        this.update_values();
        this.next_frame = this.spl.draw(this.sprite, this.action, this.pos[0], this.pos[1], {frame:this.next_frame});
    }
}
