import meta from './Meta';
import Keyboard from './Keyboard';

export default class Map {
    constructor(ctx, spl) {
        this.spl = spl;

        this.map = [];
        this.camera_width = meta.camera[0];
        this.camera_height = meta.camera[1];
        this.map_width = meta.map[0];
        this.map_height = meta.map[1];

        this.camera_top_x = 0;
        this.camera_top_y = 0;
        this.keyboard = new Keyboard();
        this.generate_map();
    }

    draw(char_pos) {
        if(char_pos) {
            const [x, y] = char_pos;
            if(x < this.camera_width/4) {
                this.camera_top_x -= 1;
                if(this.camera_top_x < 0)
                    this.camera_top_x = 0
            }

            if(x > this.camera_width*3/4) {
                this.camera_top_x += 1;
                if(this.camera_top_x > this.map_width - this.camera_width)
                    this.camera_top_x = this.map_width - this.camera_width;
                
            }

            if(y < this.camera_height/4) {
                this.camera_top_y -= 1;
                if(this.camera_top_y < 0)
                    this.camera_top_y = 0;
            }

            if(y > this.camera_height*3/4) {
                this.camera_top_y += 1;
                if(this.camera_top_y > this.map_height - this.camera_height)
                    this.camera_top_y = this.map_height - this.camera_height;
            }
        }

        this.render_camera(this.camera_top_x, this.camera_top_y);
    }

    generate_map() {
        // consider spacetime drawing: for multi units(space) and animations(time)
        // and both
        for (var i = 0; i < this.map_width; i++) {
            var row = [];
            for (var j = 0; j < this.map_height; j++) {
                if ((i + j) % 5 === 0) {
                    row.push("blue_test");
                } else {
                    row.push("grass");
                }
                row.push("grass");
            }
            this.map.push(row);
        }
    }

    render_camera(x, y) {
        // same as canvas
        var camera = [];
        // camera
        for (var i = x; i < x + this.camera_width; i++) {
            var row = [];
            for (var j = y; j < y + this.camera_height; j++) {
                row.push(this.map[i][j]);
            }
            camera.push(row);
        }

        for (var i = 0; i < this.camera_width; i++) {
            for (var j = 0; j < this.camera_height; j++) {
                this.spl.draw("overworld", camera[i][j], i, j);
            }
        }
    }
}