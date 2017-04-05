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
			game: gameStart,
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
			background = 'black',
			gameState: {
				gameObjects,
			} = {},
		} = this.props;

		return (
			<svg
				id='board'
				viewBox={`0 0 ${width} ${height}`}
				width='100%'
				height='100%'
				preserveAspectRatio='xMidYMid'
			>
				<filter
					id='vectorMonitorEffect'
				>
					<feGaussianBlur
						in='SourceGraphic'
						stdDeviation='2'
					/>
				</filter>
				<rect
					sroke='none'
					fill={background}
					width={width}
					height={height}
				/>
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
					const renderPath = (blur) => do {
						if (Array.isArray(render)) {
							(
								<g>
									{render.map((points, i) =>
										<path
											key={`${k}-${i}`}
											stroke={stroke}
											srokeWidth={blur ? '2' : '1'}
											filter={blur ? 'url(#vectorMonitorEffect)' : ''}
											d={toPath(points)}
										/>
									)}
								</g>
							);
						}
						else if (typeof render === 'function') {

						}
						else {
							(
								<path
									stroke={stroke}
									srokeWidth={blur ? '2' : '1'}
									filter={blur ? 'url(#vectorMonitorEffect)' : ''}
									d={toPath(render)}
									{...renderProps}
								/>
							);
						}
					}

					return (
						<g
							{...renderProps}
						>
							{renderPath()}
							{renderPath(true)}
						</g>
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
}

export default Engine;
