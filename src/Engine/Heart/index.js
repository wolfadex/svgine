import React, { Component } from 'react';
import ifvisible from 'ifvisible.js';
import { connect } from 'react-redux';
import * as gameStateActions from '../../actions/gameState';

export const engineHeart = (ViewComponent, data) =>
	connect(({
		gameState,
	}) => ({
		gameState,
	}))(
	class extends Component {
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
			const {
				dispatch,
			} = this.props;

			ifvisible.on('blur', () => {
				dispatch(gameStateActions.paused(true));
			});
			ifvisible.on('focus', () => {
				dispatch(gameStateActions.updateTime(performance.now()));
				dispatch(gameStateActions.paused());
			});
			requestAnimationFrame(this.tick);
		}

		render() {
			return (
				<ViewComponent {...this.props} />
			);
		}

		tick(timestamp) {
			const {
				dispatch,
				gameState,
			} = this.props;
			const {
				time,
				gameObjects,
			} = gameState;
			const newTime = timestamp;

			// Update state
			dispatch(gameStateActions.updateTime(newTime));
			Object.keys(gameObjects).forEach((k) => gameObjects[k].update && gameObjects[k].update(
				(newTime - time) / 1000,
				gameObjects[k],
				gameState,
				{
					updateGameObject: (go) => dispatch(gameStateActions.updateGameObject(go)),
					addGameObject: (go, pos, rot) => dispatch(gameStateActions.addGameObject(go, pos, rot)),
					removeGameObject: (id) => dispatch(gameStateActions.removeGameObject(id)),
				},
			));

			requestAnimationFrame(this.tick);
		}

		handleKeyDown({
			altKey,
			ctrlKey,
			keyCode,
			shiftKey,
		}) {
			const {
				dispatch,
				gameState: {
					keys,
				} = {}
			} = this.props;

			dispatch(gameStateActions.keyDown(keyCode, {
				altKey,
				ctrlKey,
				shiftKey,
			}));
		}

		handleKeyUp({
			altKey,
			ctrlKey,
			keyCode,
			shiftKey,
		}) {
			const {
				dispatch,
				gameState: {
					keys,
				} = {}
			} = this.props;

			dispatch(gameStateActions.keyUp(keyCode, {
				altKey,
				ctrlKey,
				shiftKey,
			}));
		}
	});
