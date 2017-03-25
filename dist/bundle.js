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
	
	var Character = _interopRequire(__webpack_require__(6));
	
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
	                    _this.setup_map();
	                    _this.setup_character();
	                    _this.start_loop();
	                });
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
	                this.map.draw();
	                this.character.draw();
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
	        setup_map: {
	            value: function setup_map() {
	                this.map = new Map(this.ctx, this.spl);
	            }
	        },
	        setup_character: {
	            value: function setup_character() {
	                this.character = new Character(this.spl);
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
	                    70: "f"
	                };
	            }
	        },
	        on_keydown: {
	            value: function on_keydown(e) {
	                var key = this.key[e.keyCode];
	                if (!key) {
	                    return;
	                }this[key + "_pressed"] = true;
	            }
	        },
	        on_keyup: {
	            value: function on_keyup(e) {
	                var key = this.key[e.keyCode];
	                if (!key) {
	                    return;
	                }this[key + "_pressed"] = false;
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
	        this.keyboard = new Keyboard();
	        this.generate_map();
	    }
	
	    _createClass(Map, {
	        draw: {
	            value: function draw() {
	                if (this.keyboard.right_pressed) {
	                    if (this.camera_top_x + 1 < this.map_width - this.camera_width) {
	                        this.camera_top_x++;
	                    }
	                } else if (this.keyboard.down_pressed) {
	                    if (this.camera_top_y + 1 < this.map_height - this.camera_height) {
	                        this.camera_top_y++;
	                    }
	                } else if (this.keyboard.left_pressed) {
	                    if (this.camera_top_x - 1 >= 0) {
	                        this.camera_top_x--;
	                    }
	                } else if (this.keyboard.up_pressed) {
	                    if (this.camera_top_y - 1 >= 0) {
	                        this.camera_top_y--;
	                    }
	                }
	                this.render_camera(this.camera_top_x, this.camera_top_y);
	            }
	        },
	        generate_map: {
	            value: function generate_map() {
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
	        },
	        render_camera: {
	            value: function render_camera(x, y) {
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
	                    warrior: "assets/character.png"
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
	                var frame = arguments[4] === undefined ? 0 : arguments[4];
	
	                var meta = this.get_meta(sprite, element, frame);
	                this.ctx.drawImage(this[sprite], meta.x, meta.y, meta.width, meta.height, canvasX * unit, canvasY * unit, meta.width, meta.height);
	                return meta.next_frame;
	            }
	        },
	        get_meta: {
	            value: function get_meta(sprite, element, frame) {
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
	        }
	    });
	
	    return SpriteLoader;
	})();
	
	module.exports = SpriteLoader;
	
	var sprite_json = {
	    overworld: {
	        grass: [0, 0, 1, 1],
	        blue_test: [0, 1, 1, 1],
	        water_waving: [[0, 1, 1, 1], [1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [0, 2, 1, 1], [1, 2, 1, 1], [2, 2, 1, 1], [3, 2, 1, 1]]
	    },
	    warrior: {
	        walk_down: [[0, 0, 1, 2], [1, 0, 1, 2], [2, 0, 1, 2], [3, 0, 1, 2]],
	        walk_right: [[0, 2, 1, 2], [1, 2, 1, 2], [2, 2, 1, 2], [3, 2, 1, 2]],
	        walk_up: [[0, 4, 1, 2], [1, 4, 1, 2], [2, 4, 1, 2], [3, 4, 1, 2]],
	        walk_left: [[0, 6, 1, 2], [1, 6, 1, 2], [2, 6, 1, 2], [3, 6, 1, 2]],
	        attack_down: [[0, 8, 1, 2], [2, 8, 1, 2], [4, 8, 1, 2], [6, 8, 1, 2]],
	        attack_up: [[0, 10, 1, 2], [2, 10, 1, 2], [4, 10, 1, 2], [6, 10, 1, 2]],
	        attack_left: [[0, 12, 1, 2], [2, 12, 1, 2], [4, 12, 1, 2], [6, 12, 1, 2]],
	        attack_right: [[0, 14, 1, 2], [2, 14, 1, 2], [4, 14, 1, 2], [6, 14, 1, 2]] }
	};
	
	var unit = meta.unit;

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
	
	var Keyboard = _interopRequire(__webpack_require__(2));
	
	var Character = (function () {
	    function Character(spl) {
	        _classCallCheck(this, Character);
	
	        this.spl = spl;
	        this.next_frame = 0;
	        this.keyboard = new Keyboard();
	        this.pos = [Math.floor(meta.camera[0] / 2), Math.floor(meta.camera[1] / 2)];
	        this.action = "walk_down";
	    }
	
	    _createClass(Character, {
	        draw: {
	            value: function draw() {
	                var action = this.action;
	                var pos = this.pos;
	                if (this.keyboard.up_pressed) {
	                    pos[1] = pos[1] - 1;
	                    if (pos[1] < 0) pos[1] = 0;
	                    action = "walk_up";
	                } else if (this.keyboard.down_pressed) {
	                    pos[1] = pos[1] + 1;
	                    if (pos[1] > meta.camera[1] - 2) pos[1] = meta.camera[1] - 2;
	                    action = "walk_down";
	                } else if (this.keyboard.left_pressed) {
	                    pos[0] = pos[0] - 1;
	                    if (pos[0] < 0) pos[0] = 0;
	                    action = "walk_left";
	                } else if (this.keyboard.right_pressed) {
	                    pos[0] = pos[0] + 1;
	                    if (pos[0] > meta.camera[0] - 1) pos[0] = meta.camera[0] - 1;
	                    action = "walk_right";
	                } else {
	                    this.next_frame = 0;
	                }
	                this.action = action;
	                this.next_frame = this.spl.draw("warrior", action, pos[0], pos[1], this.next_frame);
	            }
	        }
	    });
	
	    return Character;
	})();
	
	module.exports = Character;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.map