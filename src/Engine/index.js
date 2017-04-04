import React, { Component } from 'react';
import ifvisible from 'ifvisible.js';
import { connect } from 'react-redux';
import * as gameStateActions from '../actions/gameState';

export const toPath = (points) => points.split(', ').reduce((t, pos) => t === '' ? `M${pos}` : `${t} L${pos}`, '');

@connect(({
	gameState,
}) => ({
	gameState,
}))
class Engine extends Component {
	constructor(props) {
		super(props);

		this.tick = this.tick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleResize = this.handleResize.bind(this);

		this.state = {
			scaler: 1,
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
		setTimeout(() => gameStart({
			addGameObject: (go, pos, rot) => dispatch(gameStateActions.addGameObject(go, pos, rot)),
		}), 1);
	}

	render() {
		const {
			width = 800,
			height = 600,
			gameObjects,
			...otherGameProps
		} = this.props;
		const {
			scaler,
		} = this.state;

		return (
			<svg
				id='board'
				width={width / scaler}
				height={height / scaler}
				style={{
					backgroundColor: 'black',
					// position: 'absolute',
					// top: '50%',
					// left: '50%',
					// transform: 'translate(-50%, -50%)',
				}}
			>
				{Object.keys(gameObjects).map((k) => {
					const {
						render,
						transform: {
							position: {
								x = 0,
								y = 0,
							} = {},
							scale: {
								x: scaleX = 1,
								y: scaleY = 1,
							} = {},
							rotation = 0,
						} = {},
						stroke = 'white',
					} = gameObjects[k];
					if (!render) {
						return null;
					}

					const renderProps = {
						key: k,
						style: {
							transform: `translate(${x}px, ${y}px) rotateZ(${rotation}deg) scale(${scaleX}, ${scaleY})`,
						},
					};

					if (Array.isArray(render)) {
						return (
							<g
								{...renderProps}
							>
								{render.map((points, i) =>
									<path
										key={`${k}-${i}`}
										stroke={stroke}
										d={toPath(points)}
									/>
								)}
							</g>
						);
					}

					if (typeof render === 'function') {

					}

					return (
						<path
							stroke={stroke}
							d={toPath(render)}
							{...renderProps}
						/>
					);
				})}
			</svg>
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
				updateGameObject: (...args) => dispatch(gameStateActions.updateGameObject(...args)),
				addGameObject: (...args) => dispatch(gameStateActions.addGameObject(...args)),
				removeGameObject: (...args) => dispatch(gameStateActions.removeGameObject(...args)),
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

	handleResize() {
		const {
			width,
			height,
		} = this.props;

		this.setState(Object.assign({}, this.state, {
			scaler: Math.max(width / window.innerWidth, height / window.innerHeight),
		}));
	}
}

export default Engine;
