import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameStateActions from 'actions/gameState';

export const engineHeart = (ViewComponent, data) =>
	connect()(
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
			requestAnimationFrame(this.tick);
		}

		render() {
			const {
				gameObjects,
			} = this.state;

			return (
				<ViewComponent
					registerGameObject={this.registerGameObject}
					gameObjects={gameObjects}
				/>
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
				keys,
			} = gameState;
			const newTime = Date.now();

			// Update state
			// dispatch()
			this.setState(Object.assign({}, this.state, {
				time: newTime,
				gameObjects: Object.keys(gameObjects).forEach((k) => gameObjects[k].update && gameObjects[k].update(
						(newTime - time) / 1000,
						gameObjects[k],
						this.state,
						{
							registerGameObject: this.registerGameObject,
							unregisterGameObject: this.unregisterGameObject,
						},
					)),
			}));

			requestAnimationFrame(this.tick);
		}

		handleKeyDown({
			altKey,
			ctrlKey,
			keyCode,
			shiftKey,
		}) {
			const {
				keys,
			} = this.state;

			this.setState(Object.assign({}, this.state, {
				keys: Object.assign({}, keys, {
					[keyCode]: true,
				})
			}));
		}

		handleKeyUp({
			altKey,
			ctrlKey,
			keyCode,
			shiftKey,
		}) {
			const {
				keys,
			} = this.state;

			this.setState(Object.assign({}, this.state, {
				keys: Object.assign({}, keys, {
					[keyCode]: false,
				})
			}));
		}
	});
