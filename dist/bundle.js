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
	
	var Keyboard = _interopRequire(__webpack_require__(2));
	
	var Map = _interopRequire(__webpack_require__(3));
	
	var SpriteLoader = _interopRequire(__webpack_require__(4));
	
	var Game = (function () {
	    function Game() {
	        var _this = this;
	
	        _classCallCheck(this, Game);
	
	        this.setup_canvas();
	        this.setup_variables();
	        this.setup_keyboard();
	        this.setup_sprites().then(function () {
	            _this.setup_map();
	        });
	    }
	
	    _createClass(Game, {
	        setup_canvas: {
	            value: function setup_canvas() {
	                this.canvas = document.getElementById("canvas");
	                this.canvas.width = 720;
	                this.canvas.height = 480;
	                this.ctx = canvas.getContext("2d");
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
	                this.map.init();
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
	        }
	    });
	
	    return Game;
	})();
	
	var game = new Game();

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
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var Map = (function () {
	    function Map(ctx, spl) {
	        _classCallCheck(this, Map);
	
	        this.ctx = ctx;
	        this.spl = spl;
	    }
	
	    _createClass(Map, {
	        init: {
	            value: function init() {
	                console.log("draw map");
	                this.spl.draw("overworld", "grass", 16, 16);
	            }
	        }
	    });
	
	    return Map;
	})();
	
	module.exports = Map;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
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
	                    overworld: "assets/Overworld.png" };
	                var promises = [];
	                for (var img in images) {
	                    (function (img) {
	                        _this[img] = new Image();
	                        _this[img].src = images[img];
	
	                        var promise = new Promise(function (resolve, reject) {
	                            _this[img].onload = function () {
	                                console.log(img, "ready");
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
	                var meta = this.get_meta(sprite, element);
	                this.ctx.drawImage(this.overworld, meta[0], meta[1], meta[2], meta[3], canvasX, canvasY, unit, unit);
	            }
	        },
	        get_meta: {
	            value: function get_meta(sprite, element) {
	                var meta = sprite_json[sprite][element];
	                meta = meta.map(function (n) {
	                    return n * unit;
	                });
	                return meta;
	            }
	        }
	    });
	
	    return SpriteLoader;
	})();
	
	module.exports = SpriteLoader;
	
	var sprite_json = {
	    overworld: {
	        grass: [0, 0, 1, 1],
	        water_waving: [[0, 1, 1, 1], [1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [0, 2, 1, 1], [1, 2, 1, 1], [2, 2, 1, 1], [3, 2, 1, 1]]
	    }
	};
	
	var unit = 16;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.map