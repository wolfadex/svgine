var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

import React, { Component } from 'react';
import ifvisible from 'ifvisible.js';
import { connect } from 'react-redux';
import * as gameStateActions from '../actions/gameState';

export var toPath = function (points) {
	return points.split(', ').reduce(function (t, pos) {
		return t === '' ? `M${pos}` : `${t} L${pos}`;
	}, '');
};

var Engine = (_dec = connect(function ({
	gameState
}) {
	return {
		gameState
	};
}), _dec(_class = class Engine extends Component {
	constructor(props) {
		super(props);

		this.tick = this.tick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleResize = this.handleResize.bind(this);

		this.state = {
			scaler: 1
		};
	}

	componentWillMount() {
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('keyup', this.handleKeyUp);
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('keyup', this.handleKeyUp);
		window.removeEventListener('resize', this.handleResize);
	}

	componentDidMount() {
		var {
			dispatch,
			game: gameStart
		} = this.props;

		ifvisible.on('blur', function () {
			dispatch(gameStateActions.paused(true));
		});
		ifvisible.on('focus', function () {
			dispatch(gameStateActions.updateTime(performance.now()));
			dispatch(gameStateActions.paused());
		});
		requestAnimationFrame(this.tick);
		setTimeout(function () {
			return gameStart({
				addGameObject: function (go, pos, rot) {
					return dispatch(gameStateActions.addGameObject(go, pos, rot));
				}
			});
		}, 1);
	}

	render() {
		var {
			width = 800,
			height = 600,
			gameState: {
				gameObjects
			} = {}
		} = this.props;
		var {
			scaler
		} = this.state;

		return React.createElement(
			'svg',
			{
				id: 'board',
				viewBox: `0 0 ${width} ${height}`,
				preserveAspectRatio: true
				// width={width}
				// height={height}
				, style: {
					backgroundColor: 'black',
					// position: 'absolute',
					// top: '50%',
					// left: '50%',
					// transform: 'translate(-50%, -50%)',
					transform: `scale(${1}, ${1})`
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

				if (Array.isArray(render)) {
					return React.createElement(
						'g',
						renderProps,
						render.map(function (points, i) {
							return React.createElement('path', {
								key: `${k}-${i}`,
								stroke: stroke,
								d: toPath(points)
							});
						})
					);
				}

				if (typeof render === 'function') {}

				return React.createElement('path', _extends({
					stroke: stroke,
					d: toPath(render)
				}, renderProps));
			})
		);
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
		dispatch(gameStateActions.updateTime(newTime));
		Object.keys(gameObjects).forEach(function (k) {
			return gameObjects[k].update && gameObjects[k].update((newTime - time) / 1000, gameObjects[k], gameState, {
				updateGameObject: function (...args) {
					return dispatch(gameStateActions.updateGameObject(...args));
				},
				addGameObject: function (...args) {
					return dispatch(gameStateActions.addGameObject(...args));
				},
				removeGameObject: function (...args) {
					return dispatch(gameStateActions.removeGameObject(...args));
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

		dispatch(gameStateActions.keyDown(keyCode, {
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

		dispatch(gameStateActions.keyUp(keyCode, {
			altKey,
			ctrlKey,
			shiftKey
		}));
	}

	handleResize() {
		var {
			width,
			height
		} = this.props;

		this.setState(Object.assign({}, this.state, {
			scaler: Math.max(width / window.innerWidth, height / window.innerHeight)
		}));
	}
}) || _class);


export default Engine;