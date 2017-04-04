import React, { Component } from 'react';
import ifvisible from 'ifvisible.js';
import { connect } from 'react-redux';
import * as gameStateActions from '../../actions/gameState';

export var engineHeart = function (ViewComponent, data) {
	return connect(function ({
		gameState
	}) {
		return {
			gameState
		};
	})(class extends Component {
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

			ifvisible.on('blur', function () {
				dispatch(gameStateActions.paused(true));
			});
			ifvisible.on('focus', function () {
				dispatch(gameStateActions.updateTime(performance.now()));
				dispatch(gameStateActions.paused());
			});
			requestAnimationFrame(this.tick);
		}

		render() {
			return React.createElement(ViewComponent, this.props);
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
					updateGameObject: function (go) {
						return dispatch(gameStateActions.updateGameObject(go));
					},
					addGameObject: function (go, pos, rot) {
						return dispatch(gameStateActions.addGameObject(go, pos, rot));
					},
					removeGameObject: function (id) {
						return dispatch(gameStateActions.removeGameObject(id));
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
	});
};