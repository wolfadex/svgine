import React, { Component } from 'react';
import { engineHeart } from 'root/Engine/Heart';
import ship from 'root/Game/ship';

const aspectRatio = 0.9;

export const getBounds = () => document.getElementById('board').getBoundingClientRect();

@engineHeart
class Board extends Component {
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
		window.addEventListener('resize', this.handleResize);
	}

	componentDidMount() {
		const {
			registerGameObject,
		} = this.props;

		this.setState(Object.assign({}, this.state, {
			width: window.innerWidth,
			height: window.innerHeight,
		}));

		setTimeout(() => registerGameObject(ship), 1);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
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
				width={width * aspectRatio}
				height={height * aspectRatio}
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
						path,
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

					return (
						<path
							key={k}
							stroke={stroke}
							d={path}
							style={{
								transform: `translate(${x}px, ${y}px) rotateZ(${rotation}deg) scale(${scaleX}, ${scaleY})`,
							}}
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

export default Board;
