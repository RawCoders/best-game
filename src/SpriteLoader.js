export default class SpriteLoader {

    constructor(ctx) {
        this.ctx = ctx;
    }

    setup_images() {
        const images = {
            'cave': 'assets/cave.png',
            'overworld': 'assets/Overworld.png',
        };
        let promises = [];
        for (let img in images) {
            this[img] = new Image();
            this[img].src = images[img];
            
            const promise = new Promise((resolve, reject) => {
                this[img].onload = () => {
                    console.log(img, 'ready');
                    resolve(img);
                };
            });
            promises.push(promise);
        }

        return Promise.all(promises);
    }

    load() {
        return this.setup_images();
    }

    draw(sprite, element, canvasX, canvasY) {
        const meta = this.get_meta(sprite, element);
        this.ctx.drawImage(this.overworld, meta[0], meta[1], meta[2], meta[3], canvasX, canvasY, unit, unit);
    }

    get_meta(sprite, element) {
        let meta = sprite_json[sprite][element];
        meta = meta.map(n => n * unit);
        return meta;
    }
}

const sprite_json = {
    overworld: {
        grass: [0, 0, 1, 1],
        water_waving: [
            [0, 1, 1, 1],
            [1, 1, 1, 1],
            [2, 1, 1, 1],
            [3, 1, 1, 1],
            [0, 2, 1, 1],
            [1, 2, 1, 1],
            [2, 2, 1, 1],
            [3, 2, 1, 1]
        ]
    }
};

const unit = 16;
