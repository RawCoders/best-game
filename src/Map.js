export default class Map {
    constructor(ctx, spl) {
        this.ctx = ctx;
        this.spl = spl;
    }

    draw() {
        this.spl.draw('overworld', 'grass', 0, 0);
    }
}