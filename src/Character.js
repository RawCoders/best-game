import { get_game as Game } from './Game';
import { get_world as World } from './Game';

export default class Character {
    constructor(spl, position) {
        this.spl = spl;

        this.next_frame = 0;
        this.pos = position;
        this.hp = 0;
        this.active = true;
        this.sprite = 'override_me';
        this.action = 'walk_down';

        this.game = Game();
        this.world = World();
    }

    update_values() {
        // update this.pos, this.action or any decision variable here
    }

    draw() {
        // make copy of old pos
        this.old_pos = this.pos.slice();
        this.update_values();
        if(this.is_obstacle()) {
            this.pos = this.old_pos;
        }

        this.next_frame = this.spl.draw_on_map(this.sprite, this.action, this.pos[0], this.pos[1], {frame:this.next_frame});

        const { ceil_x, ceil_y, floor_x, floor_y } = this.get_floor_ceil();

        window.obstacles[ceil_x][ceil_y] = 1;
        window.obstacles[floor_x][floor_y] = 1;
    }

    is_obstacle() {
        const { ceil_x, ceil_y, floor_x, floor_y } = this.get_floor_ceil();
        return window.obstacles[ceil_x][ceil_y] || window.obstacles[floor_x][floor_y];
    }

    get_floor_ceil() {
        const ceil_x = Math.ceil(this.pos[0]);
        const ceil_y = Math.ceil(this.pos[1]);
        
        const floor_x = Math.floor(this.pos[0]);
        const floor_y = Math.floor(this.pos[1]);

        return { ceil_x, ceil_y, floor_x, floor_y };
    }
}
