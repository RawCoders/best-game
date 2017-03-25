export default class Character {
    constructor(spl) {
        this.spl = spl;
        this.next_frame = 0;
    }

    draw() {
        this.next_frame = this.spl.draw('warrior', 'walk_left', 44, 10, this.next_frame);
    }
}
