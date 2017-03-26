(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["es6Boilerplate"] = factory();
	else
		root["es6Boilerplate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var meta = _interopRequire(__webpack_require__(5));
	
	var Keyboard = _interopRequire(__webpack_require__(2));
	
	var SpriteLoader = _interopRequire(__webpack_require__(4));
	
	var Map = _interopRequire(__webpack_require__(3));
	
	var Warrior = _interopRequire(__webpack_require__(7));
	
	var Enemy = _interopRequire(__webpack_require__(8));
	
	var WelcomeScreen = _interopRequire(__webpack_require__(9));
	
	var Game = (function () {
	    function Game() {
	        _classCallCheck(this, Game);
	
	        this.setup_canvas();
	        this.setup_variables();
	        this.setup_keyboard();
	        this.bind_stop();
	    }
	
	    _createClass(Game, {
	        init: {
	            value: function init() {
	                var _this = this;
	
	                this.setup_sprites().then(function () {
	                    _this.start_game();
	                });
	            }
	        },
	        start_game: {
	            value: function start_game() {
	                this.setup_welcome_screen();
	                this.setup_map();
	                this.setup_warrior();
	                this.setup_enemy();
	                this.start_loop();
	            }
	        },
	        setup_canvas: {
	            value: function setup_canvas() {
	                this.canvas = document.getElementById("canvas");
	                this.canvas.width = meta.canvas[0];
	                this.canvas.height = meta.canvas[1];
	                this.ctx = canvas.getContext("2d");
	            }
	        },
	        start_loop: {
	            value: function start_loop() {
	                this.game_loop = setInterval(this.draw.bind(this), this.o.frameRate);
	            }
	        },
	        draw: {
	            value: function draw() {
	                this.ctx.clearRect(0, 0, this.o.canvas_width, this.o.canvas_height);
	                if (!this.game_started) {
	                    this.welcome_screen.draw();
	                } else {
	                    this.map.draw(this.char_pos);
	                    this.char_pos = this.warrior.draw();
	                    this.enemy_1.draw(this.warrior);
	                    this.enemy_2.draw(this.warrior);
	                }
	            }
	        },
	        setup_sprites: {
	            value: function setup_sprites() {
	                this.spl = new SpriteLoader(this.ctx);
	                return this.spl.load();
	            }
	        },
	        setup_keyboard: {
	            value: function setup_keyboard() {
	                this.keyboard = new Keyboard();
	            }
	        },
	        setup_welcome_screen: {
	            value: function setup_welcome_screen() {
	                var _this = this;
	
	                this.welcome_screen = new WelcomeScreen(this.spl, {
	                    on_gamestart: function () {
	                        _this.game_started = true;
	                    }
	                });
	            }
	        },
	        setup_map: {
	            value: function setup_map() {
	                this.map = new Map(this.ctx, this.spl);
	            }
	        },
	        setup_warrior: {
	            value: function setup_warrior() {
	                this.warrior = new Warrior(this.spl, [Math.floor(meta.camera[0] / 2), Math.floor(meta.camera[1] / 2)], "netchamp");
	            }
	        },
	        setup_enemy: {
	            value: function setup_enemy() {
	                this.enemy_1 = new Enemy(this.spl, [Math.floor(meta.camera[0]) - 2, 2], 1 / 2);
	                this.enemy_2 = new Enemy(this.spl, [2, Math.floor(meta.camera[1]) - 2], 1 / 4);
	            }
	        },
	        setup_variables: {
	            value: function setup_variables() {
	                this.o = {
	                    canvas_height: this.canvas.height,
	                    canvas_width: this.canvas.width,
	                    frameRate: 1000 / 8,
	                    frame: 0
	                };
	                this.game_started = false;
	            }
	        },
	        bind_stop: {
	            value: function bind_stop() {
	                var _this = this;
	
	                document.getElementById("stop").addEventListener("click", function () {
	                    clearInterval(_this.game_loop);
	                });
	            }
	        }
	    });
	
	    return Game;
	})();
	
	var game = new Game();
	game.init();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Keyboard = (function () {
	    function Keyboard() {
	        _classCallCheck(this, Keyboard);
	
	        this.setup_keymap();
	        document.addEventListener("keydown", this.on_keydown.bind(this), false);
	        document.addEventListener("keyup", this.on_keyup.bind(this), false);
	    }
	
	    _createClass(Keyboard, {
	        setup_keymap: {
	            value: function setup_keymap() {
	                this.key = {
	                    39: "right",
	                    37: "left",
	                    38: "up",
	                    40: "down",
	                    70: "f",
	                    32: "space"
	                };
	            }
	        },
	        on_keydown: {
	            value: function on_keydown(e) {
	                var key = this.key[e.keyCode];
	                if (!key) {
	                    return;
	                }this[key + "_pressed"] = true;
	                this["on_keydown_" + key] && this["on_keydown_" + key]();
	            }
	        },
	        on_keyup: {
	            value: function on_keyup(e) {
	                var key = this.key[e.keyCode];
	                if (!key) {
	                    return;
	                }this[key + "_pressed"] = false;
	                this["on_keyup_" + key] && this["on_keyup_" + key]();
	            }
	        }
	    });
	
	    return Keyboard;
	})();
	
	module.exports = Keyboard;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var meta = _interopRequire(__webpack_require__(5));
	
	var Keyboard = _interopRequire(__webpack_require__(2));
	
	var Map = (function () {
	    function Map(ctx, spl) {
	        _classCallCheck(this, Map);
	
	        this.spl = spl;
	
	        this.map = [];
	        this.camera_width = meta.camera[0];
	        this.camera_height = meta.camera[1];
	        this.map_width = meta.map[0];
	        this.map_height = meta.map[1];
	
	        this.camera_top_x = 0;
	        this.camera_top_y = 0;
	        this.camera_top_x = Math.floor((this.map_width - this.camera_width) / 2);
	        this.camera_top_y = Math.floor((this.map_height - this.camera_height) / 2);
	        this.keyboard = new Keyboard();
	        this.generate_map();
	    }
	
	    _createClass(Map, {
	        draw: {
	            value: function draw(char_pos) {
	                if (char_pos) {
	                    var _char_pos = _slicedToArray(char_pos, 2);
	
	                    var x = _char_pos[0];
	                    var y = _char_pos[1];
	
	                    if (x < this.camera_width / 4 && this.keyboard.left_pressed) {
	                        this.camera_top_x -= 1;
	                        if (this.camera_top_x < 0) this.camera_top_x = 0;
	                    }
	
	                    if (x > this.camera_width * 3 / 4 && this.keyboard.right_pressed) {
	                        this.camera_top_x += 1;
	                        if (this.camera_top_x > this.map_width - this.camera_width) this.camera_top_x = this.map_width - this.camera_width;
	                    }
	
	                    if (y < this.camera_height / 4 && this.keyboard.up_pressed) {
	                        this.camera_top_y -= 1;
	                        if (this.camera_top_y < 0) this.camera_top_y = 0;
	                    }
	
	                    if (y > this.camera_height * 3 / 4 && this.keyboard.down_pressed) {
	                        this.camera_top_y += 1;
	                        if (this.camera_top_y > this.map_height - this.camera_height) this.camera_top_y = this.map_height - this.camera_height;
	                    }
	                }
	
	                this.render_camera(this.camera_top_x, this.camera_top_y);
	            }
	        },
	        generate_map: {
	            value: function generate_map() {
	                var _this = this;
	
	                var me = this;
	                // TO DO: start at centre, define obstacles
	                // TO DO: consider spacetime drawing: for multi units(space) and animations(time)
	
	                for (var i = 0; i < this.map_width; i++) {
	                    var row = [];
	                    for (var j = 0; j < this.map_height; j++) {
	                        row.push(0);
	                    }
	                    this.map.push(row);
	                }
	
	                var terrain_objects = ["yellow_patch", "blue_patch", "green_patch_1", "green_patch_2", "green_patch_3", "green_patch_4"];
	                var obstacles = ["house_1"];
	
	                var frequencies = {
	                    area25: [2, 3],
	
	                    area9: [15, 16, 17],
	                    area6: [19, 20, 21],
	                    area4: [24, 25, 26],
	                    area2: [24, 25, 26],
	                    area1: [22, 23, 24] };
	
	                terrain_objects.forEach(function (object) {
	                    var meta = _this.spl.get_sprite_size("overworld", object);
	                    var freq_list = frequencies["area" + meta.width * meta.height];
	                    var frequency = freq_list[Math.floor(Math.random() * freq_list.length)];
	
	                    for (var i = 0; i < frequency; i++) {
	                        var _get_random_start_position = get_random_start_position(meta.width, meta.height);
	
	                        var _get_random_start_position2 = _slicedToArray(_get_random_start_position, 2);
	
	                        var rand_x = _get_random_start_position2[0];
	                        var rand_y = _get_random_start_position2[1];
	
	                        place_object(object, rand_x, rand_y, meta.width, meta.height);
	                    }
	                });
	
	                function place_object(object, x, y, width, height) {
	                    for (var i = x; i < x + width; i++) {
	                        for (var j = y; j < y + height; j++) {
	                            if (me.map[i][j] !== 0) {
	                                // regenerate random start and retry?
	                                return;
	                            }
	                        }
	                    }
	
	                    for (var i = x; i < x + width; i++) {
	                        for (var j = y; j < y + height; j++) {
	                            me.map[i][j] = [object, i - x, j - y];
	                        }
	                    }
	                }
	
	                function get_random_start_position(width, height) {
	                    return [Math.floor(Math.random() * (me.map_width - width)), Math.floor(Math.random() * (me.map_height - height))];
	                }
	            }
	        },
	        render_camera: {
	            value: function render_camera(x, y) {
	                var camera = [];
	                for (var i = x; i < x + this.camera_width; i++) {
	                    var row = [];
	                    for (var j = y; j < y + this.camera_height; j++) {
	                        row.push(this.map[i][j]);
	                    }
	                    camera.push(row);
	                }
	
	                for (var i = 0; i < this.camera_width; i++) {
	                    for (var j = 0; j < this.camera_height; j++) {
	                        if (camera[i][j] === 0) {
	                            this.spl.draw("overworld", "grass", i, j);
	                        } else {
	                            // this.spl.draw("overworld", camera[i][j], i, j);
	                            this.spl.draw_constrained("overworld", camera[i][j][0], camera[i][j][1], camera[i][j][2], i, j);
	                        }
	                    }
	                }
	            }
	        }
	    });
	
	    return Map;
	})();
	
	module.exports = Map;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var meta = _interopRequire(__webpack_require__(5));
	
	var SpriteLoader = (function () {
	    function SpriteLoader(ctx) {
	        _classCallCheck(this, SpriteLoader);
	
	        this.ctx = ctx;
	    }
	
	    _createClass(SpriteLoader, {
	        setup_images: {
	            value: function setup_images() {
	                var _this = this;
	
	                var images = {
	                    cave: "assets/cave.png",
	                    overworld: "assets/Overworld.png",
	                    warrior: "assets/warrior.png",
	                    enemy: "assets/enemy.png",
	                    font: "assets/font.png"
	                };
	                var promises = [];
	                for (var img in images) {
	                    (function (img) {
	                        _this[img] = new Image();
	                        _this[img].src = images[img];
	
	                        var promise = new Promise(function (resolve, reject) {
	                            _this[img].onload = function () {
	                                resolve(img);
	                            };
	                        });
	                        promises.push(promise);
	                    })(img);
	                }
	
	                return Promise.all(promises);
	            }
	        },
	        load: {
	            value: function load() {
	                return this.setup_images();
	            }
	        },
	        draw: {
	            value: function draw(sprite, element, canvasX, canvasY) {
	                var _ref = arguments[4] === undefined ? {} : arguments[4];
	
	                var _ref$frame = _ref.frame;
	                var frame = _ref$frame === undefined ? 0 : _ref$frame;
	                var _ref$scale = _ref.scale;
	                var scale = _ref$scale === undefined ? 1 : _ref$scale;
	
	                var meta = this.get_meta(sprite, element, frame);
	                this.ctx.drawImage(this[sprite], meta.x, meta.y, meta.width, meta.height, canvasX * unit, canvasY * unit, meta.width * scale, meta.height * scale);
	                return meta.next_frame;
	            }
	        },
	        draw_constrained: {
	            value: function draw_constrained(sprite, element, elementX, elementY, canvasX, canvasY) {
	                var _ref = arguments[6] === undefined ? {} : arguments[6];
	
	                var _ref$frame = _ref.frame;
	                var frame = _ref$frame === undefined ? 0 : _ref$frame;
	                var _ref$scale = _ref.scale;
	                var scale = _ref$scale === undefined ? 1 : _ref$scale;
	
	                var meta = this.get_meta(sprite, element, frame);
	                var startX = meta.x + elementX * unit;
	                var startY = meta.y + elementY * unit;
	
	                var width = meta.width - elementX * unit;
	                var height = meta.height - elementY * unit;
	
	                this.ctx.drawImage(this[sprite], startX, startY, width, height, canvasX * unit, canvasY * unit, width * scale, height * scale);
	                return meta.next_frame;
	            }
	        },
	        drawText: {
	            value: function drawText(string, canvasX, canvasY) {
	                var _ref = arguments[3] === undefined ? {} : arguments[3];
	
	                var _ref$scale = _ref.scale;
	                var scale = _ref$scale === undefined ? 1 : _ref$scale;
	
	                var cursor = [canvasX, canvasY];
	                var unit = font_unit * scale;
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var char = _step.value;
	
	                        var _meta = this.get_font_meta(char);
	                        this.ctx.drawImage(this.font, _meta.x, _meta.y, _meta.width, _meta.height, cursor[0] * unit, cursor[1] * unit, _meta.width * scale, _meta.height * scale);
	                        cursor = [cursor[0] + 1, cursor[1]];
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator["return"]) {
	                            _iterator["return"]();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	        },
	        get_meta: {
	            value: function get_meta(sprite, element) {
	                var frame = arguments[2] === undefined ? 0 : arguments[2];
	
	                var meta = sprite_json[sprite][element];
	                var x = undefined,
	                    y = undefined,
	                    width = undefined,
	                    height = undefined,
	                    is_animation = false,
	                    next_frame = 0;
	                is_animation = typeof meta[0] !== "number" && "length" in meta[0];
	
	                if (is_animation) {
	                    meta = meta[frame];
	                    next_frame = (frame + 1) % meta.length;
	                }
	
	                meta = meta.map(function (n) {
	                    return n * unit;
	                });
	
	                x = meta[0];
	                y = meta[1];
	                width = meta[2];
	                height = meta[3];
	
	                return { x: x, y: y, width: width, height: height, is_animation: is_animation, next_frame: next_frame };
	            }
	        },
	        get_font_meta: {
	            value: function get_font_meta(char) {
	                var meta = font_json[char];
	                meta = meta.map(function (n) {
	                    return n * font_unit;
	                });
	                return {
	                    x: meta[0],
	                    y: meta[1],
	                    width: meta[2],
	                    height: meta[3]
	                };
	            }
	        },
	        get_sprite_size: {
	            value: function get_sprite_size(sprite, element) {
	                var meta = sprite_json[sprite][element];
	                return { width: meta[2], height: meta[3] };
	            }
	        }
	    });
	
	    return SpriteLoader;
	})();
	
	module.exports = SpriteLoader;
	
	var sprite_json = {
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
	        house_2: [],
	        tower: [],
	        water_waving: [[0, 1, 1, 1], [1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [0, 2, 1, 1], [1, 2, 1, 1], [2, 2, 1, 1], [3, 2, 1, 1]] },
	    warrior: {
	        walk_down: [[0, 0, 1, 2], [1, 0, 1, 2], [2, 0, 1, 2], [3, 0, 1, 2]],
	        walk_right: [[0, 2, 1, 2], [1, 2, 1, 2], [2, 2, 1, 2], [3, 2, 1, 2]],
	        walk_up: [[0, 4, 1, 2], [1, 4, 1, 2], [2, 4, 1, 2], [3, 4, 1, 2]],
	        walk_left: [[0, 6, 1, 2], [1, 6, 1, 2], [2, 6, 1, 2], [3, 6, 1, 2]],
	        attack_down: [[0, 8, 1, 2], [2, 8, 1, 2], [4, 8, 1, 2], [6, 8, 1, 2]],
	        attack_up: [[0, 10, 1, 2], [2, 10, 1, 2], [4, 10, 1, 2], [6, 10, 1, 2]],
	        attack_left: [[0, 12, 1, 2], [2, 12, 1, 2], [4, 12, 1, 2], [6, 12, 1, 2]],
	        attack_right: [[0, 14, 1, 2], [2, 14, 1, 2], [4, 14, 1, 2], [6, 14, 1, 2]] },
	    enemy: {
	        walk_down: [[0, 0, 1, 2], [1, 0, 1, 2], [2, 0, 1, 2], [3, 0, 1, 2]],
	        walk_right: [[0, 2, 1, 2], [1, 2, 1, 2], [2, 2, 1, 2], [3, 2, 1, 2]],
	        walk_up: [[0, 4, 1, 2], [1, 4, 1, 2], [2, 4, 1, 2], [3, 4, 1, 2]],
	        walk_left: [[0, 6, 1, 2], [1, 6, 1, 2], [2, 6, 1, 2], [3, 6, 1, 2]] },
	    font: {
	        backdrop: [0, 3, 15, 5] }
	};
	
	var font_json = {
	    A: [0, 0, 1, 2],
	    a: [1, 0, 1, 2],
	    B: [2, 0, 1, 2],
	    b: [3, 0, 1, 2],
	    C: [4, 0, 1, 2],
	    c: [5, 0, 1, 2],
	    D: [6, 0, 1, 2],
	    d: [7, 0, 1, 2],
	    E: [8, 0, 1, 2],
	    e: [9, 0, 1, 2],
	    F: [10, 0, 1, 2],
	    f: [11, 0, 1, 2],
	    G: [12, 0, 1, 2],
	    g: [13, 0, 1, 2],
	    H: [14, 0, 1, 2],
	    h: [15, 0, 1, 2],
	    I: [16, 0, 1, 2],
	    i: [17, 0, 1, 2],
	    J: [18, 0, 1, 2],
	    j: [19, 0, 1, 2],
	    K: [20, 0, 1, 2],
	    k: [21, 0, 1, 2],
	    L: [22, 0, 1, 2],
	    l: [23, 0, 1, 2],
	    M: [24, 0, 1, 2],
	    m: [25, 0, 1, 2],
	    N: [0, 2, 1, 2],
	    n: [1, 2, 1, 2],
	    O: [2, 2, 1, 2],
	    o: [3, 2, 1, 2],
	    P: [4, 2, 1, 2],
	    p: [5, 2, 1, 2],
	    Q: [6, 2, 1, 2],
	    q: [7, 2, 1, 2],
	    R: [8, 2, 1, 2],
	    r: [9, 2, 1, 2],
	    S: [10, 2, 1, 2],
	    s: [11, 2, 1, 2],
	    T: [12, 2, 1, 2],
	    t: [13, 2, 1, 2],
	    U: [14, 2, 1, 2],
	    u: [15, 2, 1, 2],
	    V: [16, 2, 1, 2],
	    v: [17, 2, 1, 2],
	    W: [18, 2, 1, 2],
	    w: [19, 2, 1, 2],
	    X: [20, 2, 1, 2],
	    x: [21, 2, 1, 2],
	    Y: [22, 2, 1, 2],
	    y: [23, 2, 1, 2],
	    Z: [24, 2, 1, 2],
	    z: [25, 2, 1, 2],
	    " ": [26, 0, 1, 2] };
	
	var unit = meta.unit;
	var font_unit = 8;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var meta = {
	    canvas: [720, 480],
	    map: [64, 64],
	    unit: 16
	};
	
	meta.camera = [meta.canvas[0] / meta.unit, meta.canvas[1] / meta.unit];
	
	module.exports = meta;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var meta = _interopRequire(__webpack_require__(5));
	
	var Character = (function () {
	    function Character(spl, inital_position) {
	        _classCallCheck(this, Character);
	
	        this.spl = spl;
	
	        this.next_frame = 0;
	        this.pos = inital_position;
	        this.sprite = "override_me";
	        // this.pos = [Math.floor(meta.camera[0]/2), Math.floor(meta.camera[1]/2)];
	        this.action = "walk_down";
	    }
	
	    _createClass(Character, {
	        update_values: {
	            value: function update_values() {}
	        },
	        draw: {
	            value: function draw() {
	                this.update_values();
	                this.next_frame = this.spl.draw(this.sprite, this.action, this.pos[0], this.pos[1], { frame: this.next_frame });
	            }
	        }
	    });
	
	    return Character;
	})();
	
	module.exports = Character;
	
	// update this.pos, this.action or any decision variable here

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var meta = _interopRequire(__webpack_require__(5));
	
	var Character = _interopRequire(__webpack_require__(6));
	
	var Keyboard = _interopRequire(__webpack_require__(2));
	
	var Warrior = (function (_Character) {
	    function Warrior(spl, initial_position, name) {
	        _classCallCheck(this, Warrior);
	
	        _get(Object.getPrototypeOf(Warrior.prototype), "constructor", this).call(this, spl, initial_position);
	
	        this.keyboard = new Keyboard();
	        this.sprite = "warrior";
	        this.action = "walk_down";
	
	        this.name = name;
	    }
	
	    _inherits(Warrior, _Character);
	
	    _createClass(Warrior, {
	        update_values: {
	            value: function update_values() {
	                var pos = this.pos;
	
	                if (this.keyboard.up_pressed) {
	                    pos[1] = pos[1] - 1;
	                    if (pos[1] < 0) pos[1] = 0;
	
	                    this.action = "walk_up";
	                } else if (this.keyboard.down_pressed) {
	                    pos[1] = pos[1] + 1;
	                    if (pos[1] > meta.camera[1] - 2) pos[1] = meta.camera[1] - 2;
	
	                    this.action = "walk_down";
	                } else if (this.keyboard.left_pressed) {
	                    pos[0] = pos[0] - 1;
	                    if (pos[0] < 0) pos[0] = 0;
	
	                    this.action = "walk_left";
	                } else if (this.keyboard.right_pressed) {
	                    pos[0] = pos[0] + 1;
	                    if (pos[0] > meta.camera[0] - 1) pos[0] = meta.camera[0] - 1;
	
	                    this.action = "walk_right";
	                } else {
	                    this.next_frame = 0;
	                }
	            }
	        },
	        draw_name: {
	            value: function draw_name() {
	                var name = this.name;
	                this.spl.drawText(name, this.pos[0] * 2 - name.length / 2 + 1, (this.pos[1] - 1) * 2, { scale: 1 });
	            }
	        },
	        draw: {
	            value: function draw() {
	                _get(Object.getPrototypeOf(Warrior.prototype), "draw", this).call(this);
	                this.draw_name();
	                return this.pos;
	            }
	        }
	    });
	
	    return Warrior;
	})(Character);
	
	module.exports = Warrior;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var meta = _interopRequire(__webpack_require__(5));
	
	var Character = _interopRequire(__webpack_require__(6));
	
	var Enemy = (function (_Character) {
	    function Enemy(spl, pos, speed) {
	        _classCallCheck(this, Enemy);
	
	        _get(Object.getPrototypeOf(Enemy.prototype), "constructor", this).call(this, spl, pos);
	
	        this.sprite = "enemy";
	        this.action = "walk_down";
	        this.speed = speed;
	    }
	
	    _inherits(Enemy, _Character);
	
	    _createClass(Enemy, {
	        update_values: {
	            value: function update_values(character) {
	                var pos = this.pos;
	                var speed = this.speed;
	
	                function character_in_range() {
	                    var range_x = 8;
	                    var range_y = 6;
	                    var returnValue = false;
	
	                    function in_x_range() {
	                        if (pos[0] + range_x >= character.pos[0] && character.pos[0] >= pos[0] || pos[0] - range_x <= character.pos[0] && character.pos[0] <= pos[0]) {
	                            return true;
	                        } else {
	                            return false;
	                        }
	                    }
	
	                    function in_y_range() {
	                        if (pos[1] + range_y >= character.pos[1] && character.pos[1] >= pos[1] || pos[1] - range_y <= character.pos[1] && character.pos[1] <= pos[1]) {
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
	                        this.action = "walk_up";
	                    } else if (character.pos[1] > pos[1]) {
	                        pos[1] = pos[1] + speed * 1;
	                        this.action = "walk_down";
	                    } else if (character.pos[0] < pos[0]) {
	                        pos[0] = pos[0] - speed * 1;
	                        this.action = "walk_left";
	                    } else if (character.pos[0] > pos[0]) {
	                        pos[0] = pos[0] + speed * 1;
	                        this.action = "walk_right";
	                    } else {
	                        this.next_frame = 0;
	                    }
	                }
	            }
	        },
	        draw: {
	            value: function draw(character) {
	                this.update_values = this.update_values.bind(this, character);
	                _get(Object.getPrototypeOf(Enemy.prototype), "draw", this).call(this);
	            }
	        }
	    });
	
	    return Enemy;
	})(Character);
	
	module.exports = Enemy;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Keyboard = _interopRequire(__webpack_require__(2));
	
	var WelcomeScreen = (function () {
	    function WelcomeScreen(spl, handlers) {
	        _classCallCheck(this, WelcomeScreen);
	
	        this.spl = spl;
	        this.keyboard = new Keyboard();
	        this.curr_frame = 0;
	        this.space_pressed = false;
	        this.on_gamestart = handlers.on_gamestart;
	    }
	
	    _createClass(WelcomeScreen, {
	        draw: {
	            value: function draw() {
	                var _this = this;
	
	                this.spl.draw("font", "backdrop", 7, 10, { scale: 2 });
	                this.spl.drawText("Welcome to the best game", 10, 12, { scale: 2 });
	                if (this.curr_frame >= 4) {
	                    this.spl.drawText("Press space to start", 12, 15, { scale: 2 });
	                }
	                this.curr_frame = (this.curr_frame + 1) % 8;
	
	                this.keyboard.on_keyup_space = function () {
	                    _this.on_gamestart();
	                };
	
	                return this.space_pressed;
	            }
	        }
	    });
	
	    return WelcomeScreen;
	})();
	
	module.exports = WelcomeScreen;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.map