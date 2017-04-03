import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameStateActions from '../../actions/gameState';
import { engineHeart } from '../Heart';

export const getBounds = () => document.getElementById('board').getBoundingClientRect();
export const toPath = (points) => points.split(', ').reduce((t, pos) => t === '' ? `M${pos}` : `${t} L${pos}`, '');

@engineHeart
@connect(({
	gameState: {
		gameObjects,
	} = {},
}) => ({
	gameObjects,
}))
class View extends Component {
	constructor(props) {
		super(props);

		this.handleResize = this.handleResize.bind(this);

		this.state = {
			width: 0,
			height: 0,
			ready: false,
		};
	}

	componentWillMount() {
		// window.addEventListener('resize', this.handleResize);
	}

	componentDidMount() {
		const {
			dispatch,
			game: gameStart,
		} = this.props;
		//
		// this.setState(Object.assign({}, this.state, {
		// 	width: window.innerWidth,
		// 	height: window.innerHeight,
		// }));

		setTimeout(() => gameStart({
			addGameObject: (go, pos, rot) => dispatch(gameStateActions.addGameObject(go, pos, rot)),
		}), 1);
	}

	componentWillUnmount() {
		// window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const {
			bounds: {
				top: oldTop,
				bottom: oldBottom,
				left: oldLeft,
				right: oldRight,
			} = {},
			gameObjects,
			setBounds,
			...otherGameProps
		} = this.props;
		const {
			width,
			height,
		} = this.state;

		return (
			<svg
				id='board'
				// width={width * aspectRatio}
				// height={height * aspectRatio}
				width='800'
				height='600'
				style={{
					backgroundColor: 'black',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
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
					// 'M-24 -16 L-24 16 L24 0 Z'

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

	handleResize() {
		this.setState(Object.assign({}, this.state, {
			width: window.innerWidth,
			height: window.innerHeight,
		}));
	}
}

export default View;
