import Character from './Character';

export default class Enemy extends Character {
    constructor(spl, pos, speed) {
        super(spl, pos);

        this.sprite = 'enemy'
        this.action = 'walk_down';
        this.hp = 30;
        this.speed = speed;
    }

    update_values(character) {
        let pos = this.pos;
        let speed = this.speed;

        function character_in_range() {
            let range_x = 8;
            let range_y = 6;
            let returnValue = false;

            function in_x_range() {
                if ((pos[0] + range_x >= character.pos[0] && character.pos[0] >= pos[0]) ||
                    (pos[0] - range_x <= character.pos[0] && character.pos[0] <= pos[0])) {
                    return true;
                } else {
                    return false;
                }
            }

            function in_y_range() {
                if ((pos[1] + range_y >= character.pos[1] && character.pos[1] >= pos[1]) ||
                    (pos[1] - range_y <= character.pos[1] && character.pos[1] <= pos[1])) {
                    return true;
                } else {
                    return false;
                }
            }
            if (in_x_range() && in_y_range()) {
                return true;
            } else {
                return false;
            }

        }

        if (character_in_range()) {
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
    }

    draw(character) {
        this.update_values = this.update_values.bind(this, character);
        super.draw();

        const { ceil_x, ceil_y, floor_x, floor_y } = this.get_floor_ceil();
        window.enemy[ceil_x][ceil_y] = 1;
        window.enemy[floor_x][floor_y] = 1;
    }
}
