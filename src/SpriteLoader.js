export default class SpriteLoader {

    constructor(ctx) {
        this.ctx = ctx;
    }

    setup_images() {
        const images = {
            'cave': 'assets/cave.png',
            'overworld': 'assets/Overworld.png',
            'warrior': 'assets/character.png'
        };
        let promises = [];
        for (let img in images) {
            this[img] = new Image();
            this[img].src = images[img];

            const promise = new Promise((resolve, reject) => {
                this[img].onload = () => {
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

    draw(sprite, element, canvasX, canvasY, frame) {
        const meta = this.get_meta(sprite, element);
        let x, y, width, height;
        if (typeof meta[0] !== 'number' && 'length' in meta[0]) {
            x = meta[frame][0];
            y = meta[frame][1];
            width = meta[frame][2];
            height = meta[frame][3];
        } else {
            x = meta[0];
            y = meta[1];
            width = meta[2];
            height = meta[3];
        }
        this.ctx.drawImage(this[sprite], x, y, width, height, canvasX * unit, canvasY * unit, unit, unit);
        console.log(this[sprite]);
        return frame + 1;
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
    },
    warrior: {
        walk_down: [
            [0, 0, 1, 2],
            [1, 0, 1, 2],
            [2, 0, 1, 2],
            [3, 0, 1, 2],
        ],
        walk_right: [
            [0, 2, 1, 2],
            [1, 2, 1, 2],
            [2, 2, 1, 2],
            [3, 2, 1, 2],
        ],
        walk_up: [
            [0, 4, 1, 2],
            [1, 4, 1, 2],
            [2, 4, 1, 2],
            [3, 4, 1, 2],
        ],
        walk_left: [
            [0, 6, 1, 2],
            [1, 6, 1, 2],
            [2, 6, 1, 2],
            [3, 6, 1, 2],
        ],
        attack_down: [
            [0, 8, 1, 2],
            [2, 8, 1, 2],
            [4, 8, 1, 2],
            [6, 8, 1, 2],
        ],
        attack_up: [
            [0, 10, 1, 2],
            [2, 10, 1, 2],
            [4, 10, 1, 2],
            [6, 10, 1, 2],
        ],
        attack_left: [
            [0, 12, 1, 2],
            [2, 12, 1, 2],
            [4, 12, 1, 2],
            [6, 12, 1, 2],
        ],
        attack_right: [
            [0, 14, 1, 2],
            [2, 14, 1, 2],
            [4, 14, 1, 2],
            [6, 14, 1, 2],
        ],
    }
};

const unit = 16;
