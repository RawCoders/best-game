export default class Map {
    constructor(ctx, spl) {
        this.ctx = ctx;
        this.spl = spl;
    }

    init() {
        console.log('draw map');
        this.spl.draw('overworld', 'grass', 16, 16);
    }
}