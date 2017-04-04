var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameStateActions from '../../actions/gameState';
import { engineHeart } from '../Heart';

export var getBounds = function () {
	return document.getElementById('board').getBoundingClientRect();
};
export var toPath = function (points) {
	return points.split(', ').reduce(function (t, pos) {
		return t === '' ? `M${pos}` : `${t} L${pos}`;
	}, '');
};

var View = (_dec = connect(function ({
	gameState: {
		gameObjects
	} = {}
}) {
	return {
		gameObjects
	};
}), engineHeart(_class = _dec(_class = class View extends Component {
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
					return dispatch(gameStateActions.addGameObject(go, pos, rot));
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

		return React.createElement(
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

	handleResize() {
		this.setState(Object.assign({}, this.state, {
			width: window.innerWidth,
			height: window.innerHeight
		}));
	}
}) || _class) || _class);


export default View;