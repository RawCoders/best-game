import config from './Config';
import { get_game as Game } from './Game';

export default class World {
    constructor(spl) {
        this.spl = spl;

        this.game = Game();
        this.keyboard = this.game.keyboard;

        this.terrain = [];
        this.obstacles = [];
        this.water = [];

        this.camera_width = config.camera[0];
        this.camera_height = config.camera[1];
        this.map_width = config.world[0];
        this.map_height = config.world[1];

        this.camera_top_x = Math.floor((this.map_width - this.camera_width) / 2);
        this.camera_top_y = Math.floor((this.map_height - this.camera_height) / 2);
        this.generate_map();

    }

    draw(char_pos) {
        if (char_pos) {

            const [x, y] = [char_pos[0] - window.camera[0], char_pos[1] - window.camera[1]];
            if (x < this.camera_width / 4 && this.keyboard.left_pressed) {
                this.camera_top_x -= 1;
                if (this.camera_top_x < 0)
                    this.camera_top_x = 0
            }

            if (x > this.camera_width * 3 / 4 && this.keyboard.right_pressed) {
                this.camera_top_x += 1;
                if (this.camera_top_x > this.map_width - this.camera_width)
                    this.camera_top_x = this.map_width - this.camera_width;

            }

            if (y < this.camera_height / 4 && this.keyboard.up_pressed) {
                this.camera_top_y -= 1;
                if (this.camera_top_y < 0)
                    this.camera_top_y = 0;
            }

            if (y > this.camera_height * 3 / 4 && this.keyboard.down_pressed) {
                this.camera_top_y += 1;
                if (this.camera_top_y > this.map_height - this.camera_height)
                    this.camera_top_y = this.map_height - this.camera_height;
            }
        }

        window.camera = [this.camera_top_x, this.camera_top_y];
        this.obstacles.forEach(function (row, i) {
            row.forEach(function (tile, j) {
                if (+!!tile) {
                    window.obstacles[i][j] = +!!tile;
                }
            });
        });
        this.water.forEach(function (row, i) {
            row.forEach(function (tile, j) {
                if (tile) {
                    window.water[i][j] = tile;
                }
            });
        });
        this.render_camera(this.camera_top_x, this.camera_top_y);
    }

    generate_map() {
        var me = this;
        // TO DO: consider spacetime drawing: for multi units(space) and animations(time)

        for (var i = 0; i < this.map_width; i++) {
            var row = []
            for (var j = 0; j < this.map_height; j++) {
                row.push(0);
            }
            this.terrain.push(row);
        }

        for (var i = 0; i < this.map_width; i++) {
            var row = []
            for (var j = 0; j < this.map_height; j++) {
                row.push(0);
            }
            this.obstacles.push(row);
        }

        for (var i = 0; i < this.map_width; i++) {
            var row = []
            for (var j = 0; j < this.map_height; j++) {
                row.push(0);
            }
            this.water.push(row);
        }

        let terrain_objects = ['yellow_patch', 'blue_patch', 'green_patch_1', 'green_patch_2', 'green_patch_3', 'green_patch_4'];
        let obstacles = ['house_1', 'tower'];

        let frequencies = {
            area25: [5, 6, 7],
            area24: [4, 5, 6],
            area9: [15, 16, 17],
            area6: [19, 20, 21],
            area4: [24, 25, 26],
            area2: [24, 25, 26],
            area1: [22, 23, 24],
        };

        fill_objects(terrain_objects, me.terrain);
        fill_objects(obstacles, me.obstacles);


        function fill_objects(objects, layer) {
            objects.forEach((object) => {
                let meta = me.spl.get_sprite_size('overworld', object);
                let freq_list = frequencies['area' + (meta.width * meta.height)];
                let frequency = freq_list[Math.floor(Math.random() * freq_list.length)];

                for (var i = 0; i < frequency; i++) {
                    var [rand_x, rand_y] = get_random_start_position(meta.width, meta.height);
                    place_object(layer, object, rand_x, rand_y, meta.width, meta.height);
                }
            })
        }

        function place_object(layer, object, x, y, width, height) {
            for (var i = x; i < x + width; i++) {
                for (var j = y; j < y + height; j++) {
                    if (layer[i][j] !== 0) {
                        // regenerate random start and retry?
                        return;
                    }
                }
            }

            for (var i = x; i < x + width; i++) {
                for (var j = y; j < y + height; j++) {
                    if (object === 'blue_patch' && i === x + 1 && j === y) {
                        me.water[i][j] = 1;
                    }
                    layer[i][j] = [object, i - x, j - y];
                }
            }
        }

        function get_random_start_position(width, height) {
            return [Math.floor(Math.random() * (me.map_width - width)),
            Math.floor(Math.random() * (me.map_height - height))]
        }
    }

    render_camera(x, y) {
        this.t = [];
        this.o = [];
        for (let i = x; i < x + this.camera_width; i++) {
            let t_row = [], o_row = [];
            for (let j = y; j < y + this.camera_height; j++) {
                t_row.push(this.terrain[i][j]);
                o_row.push(this.obstacles[i][j]);
            }
            this.t.push(t_row);
            this.o.push(o_row);
        }

        this.draw_terrain();
    }

    draw_terrain() {
        var t = this.t;
        for (var i = 0; i < this.camera_width; i++) {
            for (var j = 0; j < this.camera_height; j++) {
                if (t[i][j] === 0) {
                    this.spl.draw("overworld", 'grass', i, j);
                } else {
                    // this.spl.draw("overworld", t[i][j], i, j);
                    this.spl.draw_constrained("overworld", t[i][j][0], t[i][j][1], t[i][j][2], i, j);
                }
            }
        }
    }

    draw_obstacles() {
        var o = this.o;
        for (var i = 0; i < this.camera_width; i++) {
            for (var j = 0; j < this.camera_height; j++) {
                if (o[i][j] !== 0) {
                    // this.spl.draw("overworld", o[i][j], i, j);
                    this.spl.draw_constrained("overworld", o[i][j][0], o[i][j][1], o[i][j][2], i, j);
                }
            }
        }
    }

    // relative to map (not camera)
    is_enemy_on_tile([tile_x, tile_y]) { 
        const { enemy_1, enemy_2 } = this.game;
        return (enemy_1.pos[0] === tile_x && enemy_1.pos[1] === tile_y) ||
            (enemy_2.pos[0] === tile_x && enemy_2.pos[1] === tile_y);
    }

    is_obstacle_on_tile([tile_x, tile_y]) {
        // if no obstacle returns 0,
        // else returns obstacles name
        return this.map.obstacles[tile_x, tile_y];
    }
}