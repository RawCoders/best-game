import meta from './Meta';
export default class SpriteLoader {

    constructor(ctx) {
        this.ctx = ctx;
    }

    setup_images() {
        const images = {
            'cave': 'assets/cave.png',
            'overworld': 'assets/Overworld.png',
            'warrior': 'assets/warrior.png',
            'enemy': 'assets/enemy.png',
            'font': 'assets/font.png'
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

    draw(sprite, element, canvasX, canvasY, {frame=0, scale=1} = {}) {
        const meta = this.get_meta(sprite, element, frame);
        this.ctx.drawImage(this[sprite], meta.x, meta.y, meta.width, meta.height, canvasX * unit, canvasY * unit, meta.width * scale, meta.height * scale);
        return meta.next_frame;
    }

    draw_constrained(sprite, element, elementX, elementY, canvasX, canvasY, {frame=0, scale=1} = {}) {
        const meta = this.get_meta(sprite, element, frame);
        let startX = meta.x + elementX*unit;
        let startY = meta.y + elementY*unit;

        let width = meta.width - elementX*unit;
        let height = meta.height - elementY*unit;

        this.ctx.drawImage(this[sprite], startX, startY, width, height, canvasX * unit, canvasY * unit, width * scale, height * scale);
        return meta.next_frame;
    }

    draw_on_map(sprite, element, mapX, mapY, {frame=0, scale=1} = {}) {
        const canvasX = mapX - window.camera[0];
        const canvasY = mapY - window.camera[1];
        const meta = this.get_meta(sprite, element, frame);
        this.ctx.drawImage(this[sprite], meta.x, meta.y, meta.width, meta.height, canvasX * unit, canvasY * unit, meta.width * scale, meta.height * scale);
        return meta.next_frame;
    }

    drawText(string, canvasX, canvasY, {scale=1} = {}) {
        let cursor = [canvasX, canvasY];
        let unit = font_unit * scale;
        for (let char of string) {
            const meta = this.get_font_meta(char);
            this.ctx.drawImage(this.font, meta.x, meta.y, meta.width, meta.height, cursor[0] * unit, cursor[1] * unit, meta.width * scale, meta.height * scale);
            cursor = [cursor[0] + 1, cursor[1]];
        }
    }

    get_meta(sprite, element, frame = 0) {
        let meta = sprite_json[sprite][element];
        let x, y, width, height, is_animation = false, next_frame = 0;
        is_animation = typeof meta[0] !== 'number' && 'length' in meta[0];

        if (is_animation) {
            meta = meta[frame];
            next_frame = (frame + 1) % meta.length;
        }

        meta = meta.map(n => n * unit);

        x = meta[0];
        y = meta[1];
        width = meta[2];
        height = meta[3];

        return { x, y, width, height, is_animation, next_frame };
    }

    get_font_meta(char) {
        let meta = font_json[char];
        meta = meta.map(n => n * font_unit);
        return {
            x: meta[0],
            y: meta[1],
            width: meta[2],
            height: meta[3]
        }
    }

    get_sprite_size(sprite, element) {
        let meta = sprite_json[sprite][element];
        return {width: meta[2], height: meta[3]};
    }
}

const sprite_json = {
    overworld: {
        grass: [0, 0, 1, 1],
        blue_test: [0, 1, 1, 1],
        yellow_patch: [0, 3, 3, 3],
        blue_patch: [2, 6, 3, 3],
        green_patch_1: [16, 32, 3, 2],
        green_patch_2: [9, 27, 2, 2],
        green_patch_3: [11, 28, 2, 1],
        green_patch_4: [13, 28, 1, 1],
        house_1: [6, 0, 5, 5],
        house_2: [5, 13, 2, 3],
        tower:[0, 21, 3, 8],
        water_waving: [
            [0, 1, 1, 1],
            [1, 1, 1, 1],
            [2, 1, 1, 1],
            [3, 1, 1, 1],
            [0, 2, 1, 1],
            [1, 2, 1, 1],
            [2, 2, 1, 1],
            [3, 2, 1, 1]
        ],
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
    },
    enemy: {
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
    },
    font: {
        backdrop: [0, 3, 15, 5],
    }
};

const font_json = {
    'A': [0, 0, 1, 2],
    'a': [1, 0, 1, 2],
    'B': [2, 0, 1, 2],
    'b': [3, 0, 1, 2],
    'C': [4, 0, 1, 2],
    'c': [5, 0, 1, 2],
    'D': [6, 0, 1, 2],
    'd': [7, 0, 1, 2],
    'E': [8, 0, 1, 2],
    'e': [9, 0, 1, 2],
    'F': [10, 0, 1, 2],
    'f': [11, 0, 1, 2],
    'G': [12, 0, 1, 2],
    'g': [13, 0, 1, 2],
    'H': [14, 0, 1, 2],
    'h': [15, 0, 1, 2],
    'I': [16, 0, 1, 2],
    'i': [17, 0, 1, 2],
    'J': [18, 0, 1, 2],
    'j': [19, 0, 1, 2],
    'K': [20, 0, 1, 2],
    'k': [21, 0, 1, 2],
    'L': [22, 0, 1, 2],
    'l': [23, 0, 1, 2],
    'M': [24, 0, 1, 2],
    'm': [25, 0, 1, 2],
    'N': [0, 2, 1, 2],
    'n': [1, 2, 1, 2],
    'O': [2, 2, 1, 2],
    'o': [3, 2, 1, 2],
    'P': [4, 2, 1, 2],
    'p': [5, 2, 1, 2],
    'Q': [6, 2, 1, 2],
    'q': [7, 2, 1, 2],
    'R': [8, 2, 1, 2],
    'r': [9, 2, 1, 2],
    'S': [10, 2, 1, 2],
    's': [11, 2, 1, 2],
    'T': [12, 2, 1, 2],
    't': [13, 2, 1, 2],
    'U': [14, 2, 1, 2],
    'u': [15, 2, 1, 2],
    'V': [16, 2, 1, 2],
    'v': [17, 2, 1, 2],
    'W': [18, 2, 1, 2],
    'w': [19, 2, 1, 2],
    'X': [20, 2, 1, 2],
    'x': [21, 2, 1, 2],
    'Y': [22, 2, 1, 2],
    'y': [23, 2, 1, 2],
    'Z': [24, 2, 1, 2],
    'z': [25, 2, 1, 2],
    ' ': [26, 0, 1, 2],
}

const unit = meta.unit;
const font_unit = 8;