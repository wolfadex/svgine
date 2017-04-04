(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("ifvisible.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "ifvisible.js"], factory);
	else if(typeof exports === 'object')
		exports["ReactSVGine"] = factory(require("react"), require("react-redux"), require("ifvisible.js"));
	else
		root["ReactSVGine"] = factory(root["React"], root["ReactRedux"], root["ifvisible.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_10__) {
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UPDATE_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ADD_GAME_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UPDATE_GAME_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return REMOVE_GAME_OBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return KEY_DOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return KEY_UP; });
/* unused harmony export SET_BOUNDS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PAUSE; });
// Engine
var UPDATE_TIME = 'UPDATE_TIME';

var ADD_GAME_OBJECT = 'ADD_GAME_OBJECT';
var UPDATE_GAME_OBJECT = 'UPDATE_GAME_OBJECT';
var REMOVE_GAME_OBJECT = 'REMOVE_GAME_OBJECT';

var KEY_DOWN = 'KEY_DOWN';
var KEY_UP = 'KEY_UP';

var SET_BOUNDS = 'SET_BOUNDS';

// Gameplay
var PAUSE = 'PAUSE';

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ActionTypes__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return updateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addGameObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removeGameObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return updateGameObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return keyDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return keyUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return paused; });


var updateTime = function (time) {
	return {
		type: __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["a" /* UPDATE_TIME */],
		time
	};
};

var addGameObject = function (gameObject, position, rotation) {
	return {
		type: __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["c" /* ADD_GAME_OBJECT */],
		gameObject,
		position,
		rotation
	};
};

var removeGameObject = function (guidToRemove) {
	return {
		type: __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["d" /* REMOVE_GAME_OBJECT */],
		guidToRemove
	};
};

var updateGameObject = function (gameObject) {
	return {
		type: __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["e" /* UPDATE_GAME_OBJECT */],
		gameObject
	};
};

var keyDown = function (key) {
	return {
		type: __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["f" /* KEY_DOWN */],
		key
	};
};

var keyUp = function (key) {
	return {
		type: __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["g" /* KEY_UP */],
		key
	};
};

var paused = function (paused) {
	return {
		type: __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["b" /* PAUSE */],
		paused
	};
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return guid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return degreeToRadian; });
var s4 = function () {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

var guid = function () {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

var degreeToRadian = function (deg) {
  return deg * Math.PI / 180;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_gameState__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Heart__ = __webpack_require__(8);
/* unused harmony export getBounds */
/* unused harmony export toPath */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






var getBounds = function () {
	return document.getElementById('board').getBoundingClientRect();
};
var toPath = function (points) {
	return points.split(', ').reduce(function (t, pos) {
		return t === '' ? `M${pos}` : `${t} L${pos}`;
	}, '');
};

var View = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(function ({
	gameState: {
		gameObjects
	} = {}
}) {
	return {
		gameObjects
	};
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Heart__["a" /* engineHeart */])(_class = _dec(_class = class View extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
	constructor(props) {
		super(props);

		this.handleResize = this.handleResize.bind(this);

		this.state = {
			width: 0,
			height: 0,
			ready: false
		};
	}

	componentWillMount() {
		// window.addEventListener('resize', this.handleResize);
	}

	componentDidMount() {
		var {
			dispatch,
			game: gameStart
		} = this.props;
		//
		// this.setState(Object.assign({}, this.state, {
		// 	width: window.innerWidth,
		// 	height: window.innerHeight,
		// }));

		setTimeout(function () {
			return gameStart({
				addGameObject: function (go, pos, rot) {
					return dispatch(__WEBPACK_IMPORTED_MODULE_2__actions_gameState__["a" /* addGameObject */](go, pos, rot));
				}
			});
		}, 1);
	}

	componentWillUnmount() {
		// window.removeEventListener('resize', this.handleResize);
	}

	render() {
		var _props = this.props,
		    {
			bounds: {
				top: oldTop,
				bottom: oldBottom,
				left: oldLeft,
				right: oldRight
			} = {},
			gameObjects,
			setBounds
		} = _props,
		    otherGameProps = _objectWithoutProperties(_props, ['bounds', 'gameObjects', 'setBounds']);
		var {
			width,
			height
		} = this.state;

		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			'svg',
			{
				id: 'board'
				// width={width * aspectRatio}
				// height={height * aspectRatio}
				, width: '800',
				height: '600',
				style: {
					backgroundColor: 'black',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}
			},
			Object.keys(gameObjects).map(function (k) {
				var {
					render,
					transform: {
						position: {
							x = 0,
							y = 0
						} = {},
						scale: {
							x: scaleX = 1,
							y: scaleY = 1
						} = {},
						rotation = 0
					} = {},
					stroke = 'white'
				} = gameObjects[k];
				if (!render) {
					return null;
				}

				var renderProps = {
					key: k,
					style: {
						transform: `translate(${x}px, ${y}px) rotateZ(${rotation}deg) scale(${scaleX}, ${scaleY})`
					}
				};
				// 'M-24 -16 L-24 16 L24 0 Z'

				if (Array.isArray(render)) {
					return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
						'g',
						renderProps,
						render.map(function (points, i) {
							return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', {
								key: `${k}-${i}`,
								stroke: stroke,
								d: toPath(points)
							});
						})
					);
				}

				if (typeof render === 'function') {}

				return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', _extends({
					stroke: stroke,
					d: toPath(render)
				}, renderProps));
			})
		);
	}

	handleResize() {
		this.setState(Object.assign({}, this.state, {
			width: window.innerWidth,
			height: window.innerHeight
		}));
	}
}) || _class) || _class);


/* harmony default export */ __webpack_exports__["a"] = (View);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ActionTypes__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = gameStateReducer;
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




var initialState = {
	gameObjects: {},
	keys: {},
	paused: false,
	time: null
};

function gameStateReducer(state = initialState, {
	gameObject,
	guidToRemove,
	key,
	paused,
	position,
	rotation,
	time,
	type
}) {
	switch (type) {
		case __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["a" /* UPDATE_TIME */]:
			return Object.assign({}, state, {
				time
			});
		case __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["b" /* PAUSE */]:
			return Object.assign({}, state, {
				paused
			});
		case __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["c" /* ADD_GAME_OBJECT */]:
			var newGUID = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* guid */])();

			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[newGUID]: Object.assign({}, gameObject, {
						transform: Object.assign({}, gameObject.transform, {
							rotation: rotation != null ? rotation : gameObject.transform.rotation,
							position: position != null ? position : gameObject.transform.position
						})
					}, gameObject.init && gameObject.init(gameObject, state), {
						guid: newGUID
					})
				})
			});
		case __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["d" /* REMOVE_GAME_OBJECT */]:
			var _state$gameObjects = state.gameObjects,
			    {
				[guidToRemove]: toRemove
			} = _state$gameObjects,
			    remainingGameObjects = _objectWithoutProperties(_state$gameObjects, [guidToRemove]);

			toRemove.destroy && toRemove.destroy(state);

			return Object.assign({}, state, {
				gameObjects: remainingGameObjects
			});
		case __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["e" /* UPDATE_GAME_OBJECT */]:
			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[gameObject.guid]: gameObject
				})
			});
		case __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["f" /* KEY_DOWN */]:
			return Object.assign({}, state, {
				keys: Object.assign({}, state.keys, {
					[key]: true
				})
			});
		case __WEBPACK_IMPORTED_MODULE_0__ActionTypes__["g" /* KEY_UP */]:
			return Object.assign({}, state, {
				keys: Object.assign({}, state.keys, {
					[key]: false
				})
			});
		default:
			return state;
	}
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magnitude", function() { return magnitude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angleToVector", function() { return angleToVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });


var Vector2 = function (x = 0, y = 0) {
	return { x, y };
};

/* harmony default export */ __webpack_exports__["default"] = (Vector2);

var add = function ({
	x: x1,
	y: y1
}, {
	x: x2,
	y: y2
}) {
	return Vector2(x1 + x2, y1 + y2);
};

var subtract = function ({
	x: x1,
	y: y1
}, {
	x: x2,
	y: y2
}) {
	return Vector2(x2 - x1, y2 - y1);
};

var multiply = function ({
	x,
	y
}, magnitude) {
	return Vector2(x * magnitude, y * magnitude);
};

var distance = function ({
	x: x1,
	y: y1
}, {
	x: x2,
	y: y2
}) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

var magnitude = function ({
	x,
	y
}) {
	return Math.sqrt(x * x + y * y);
};

var normalize = function ({
	x,
	y
}) {
	var m = magnitude({ x, y });

	return Vector2(x / m, y / m);
};

var angleToVector = function (angle) {
	return Vector2(Math.cos(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* degreeToRadian */])(angle)), Math.sin(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* degreeToRadian */])(angle)));
};

var max = function (vector, bound) {
	return magnitude(vector) > bound ? multiply(normalize(vector), bound) : vector;
};

var wrap = function ({
	x,
	y
}, {
	left = 0,
	right = 1,
	top = 0,
	bottom = 1
}) {
	return Vector2(x < left ? right + x - left : x > right ? left + x - right : x, y < top ? bottom + y - top : y > bottom ? top + y - bottom : y);
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ifvisible_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ifvisible_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ifvisible_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_gameState__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return engineHeart; });





var engineHeart = function (ViewComponent, data) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(function ({
		gameState
	}) {
		return {
			gameState
		};
	})(class extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
		constructor(props) {
			super(props);

			this.tick = this.tick.bind(this);
			this.handleKeyDown = this.handleKeyDown.bind(this);
			this.handleKeyUp = this.handleKeyUp.bind(this);
		}

		componentWillMount() {
			window.addEventListener('keydown', this.handleKeyDown);
			window.addEventListener('keyup', this.handleKeyUp);
		}

		componentWillUnmount() {
			window.removeEventListener('keydown', this.handleKeyDown);
			window.removeEventListener('keyup', this.handleKeyUp);
		}

		componentDidMount() {
			var {
				dispatch
			} = this.props;

			__WEBPACK_IMPORTED_MODULE_1_ifvisible_js___default.a.on('blur', function () {
				dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["b" /* paused */](true));
			});
			__WEBPACK_IMPORTED_MODULE_1_ifvisible_js___default.a.on('focus', function () {
				dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["c" /* updateTime */](performance.now()));
				dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["b" /* paused */]());
			});
			requestAnimationFrame(this.tick);
		}

		render() {
			return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ViewComponent, this.props);
		}

		tick(timestamp) {
			var {
				dispatch,
				gameState
			} = this.props;
			var {
				time,
				gameObjects
			} = gameState;
			var newTime = timestamp;

			// Update state
			dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["c" /* updateTime */](newTime));
			Object.keys(gameObjects).forEach(function (k) {
				return gameObjects[k].update && gameObjects[k].update((newTime - time) / 1000, gameObjects[k], gameState, {
					updateGameObject: function (go) {
						return dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["d" /* updateGameObject */](go));
					},
					addGameObject: function (go, pos, rot) {
						return dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["a" /* addGameObject */](go, pos, rot));
					},
					removeGameObject: function (id) {
						return dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["e" /* removeGameObject */](id));
					}
				});
			});

			requestAnimationFrame(this.tick);
		}

		handleKeyDown({
			altKey,
			ctrlKey,
			keyCode,
			shiftKey
		}) {
			var {
				dispatch,
				gameState: {
					keys
				} = {}
			} = this.props;

			dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["f" /* keyDown */](keyCode, {
				altKey,
				ctrlKey,
				shiftKey
			}));
		}

		handleKeyUp({
			altKey,
			ctrlKey,
			keyCode,
			shiftKey
		}) {
			var {
				dispatch,
				gameState: {
					keys
				} = {}
			} = this.props;

			dispatch(__WEBPACK_IMPORTED_MODULE_3__actions_gameState__["g" /* keyUp */](keyCode, {
				altKey,
				ctrlKey,
				shiftKey
			}));
		}
	});
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reducers_gameState__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Engine_View__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vector2__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return __WEBPACK_IMPORTED_MODULE_1__Engine_View__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return __WEBPACK_IMPORTED_MODULE_0__reducers_gameState__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vector2", function() { return __WEBPACK_IMPORTED_MODULE_2__vector2__; });
// import * as gameStateActions from './actions/gameState';

// import Heart from './Engine/Heart';





/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ })
/******/ ]);
});