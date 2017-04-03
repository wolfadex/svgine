import Vector2, { add, multiply, angleToVector, max, wrap } from 'root/vector2';
import { getBounds } from 'root/View/Board';
import * as gameStateActions from 'actions/gameState';
import bullet from 'root/Game/bullet';

const keyMap = {
	ROTATE_RIGHT: 68,
	ROTATE_RIGHT_ALT: 39,
	ROTATE_LEFT: 65,
	ROTATE_LEFT_ALT: 37,
	THRUST: 87,
	THRUST_ALT: 38,
	SHOOT: 32,
};

const rotateDirection = (keys) => (keys[keyMap.ROTATE_RIGHT] || keys[keyMap.ROTATE_RIGHT_ALT] ? 1 : 0) + (keys[keyMap.ROTATE_LEFT] || keys[keyMap.ROTATE_LEFT_ALT]  ? -1 : 0);
const thrust = (keys) => keys[keyMap.THRUST] || keys[keyMap.THRUST_ALT] ? 1 : 0;
const timeBetweenShots = 0.5;

export default {
	// Optional
	props: {
		// Custom
		rotationSpeed: 100,
		acceleration: 10,
		maxVelocity: 2000,
		velocity: Vector2(),
		timeBetweenShots: 0.5,
		timeTillNextShot: 0,
	},
	// Required
	transform: {
		position: Vector2(),
		rotation: 0,
	},
	render: '-24 -16, -24 16, 24 0, -24 -16',
	init: (gameObjectData) => {
		const {
			height,
			width,
		} = getBounds();

		return Object.assign({}, gameObjectData, {
			transform: Object.assign({}, gameObjectData.transform, {
				rotation: 270,
				position: multiply(Vector2(width, height), 0.5),
			}),
		});
	},
	update:(
		deltaTime,
		gameObjectData,
		gameState,
		{
			addGameObject,
			updateGameObject,
		},
	) => {
		const {
			paused,
		} = gameState;

		if (!paused) {
			const {
				transform: {
					rotation,
					position,
				} = {},
				props: {
					acceleration,
					maxVelocity,
					rotationSpeed,
					velocity,
					timeBetweenShots,
					timeTillNextShot,
				} = {},
				guid,
			} = gameObjectData;
			const {
				keys,
			} = gameState;
			const {
				height,
				width,
			} = getBounds();
			const newVelocity = max(add(velocity, multiply(angleToVector(rotation), acceleration * thrust(keys))), maxVelocity);
			let newTimeTillNextShot = timeTillNextShot - deltaTime;

			if (timeTillNextShot <= 0 && keys[keyMap.SHOOT]) {
				newTimeTillNextShot = timeBetweenShots;
				addGameObject(bullet, add(position, multiply(angleToVector(rotation), 20)), rotation);
			}

			updateGameObject(Object.assign({}, gameObjectData, {
				props: Object.assign({}, gameObjectData.props, {
					velocity: newVelocity,
					timeTillNextShot: newTimeTillNextShot,
				}),
				transform: Object.assign({}, gameObjectData.transform, {
					rotation: (rotation + deltaTime * rotationSpeed * rotateDirection(keys) + 360) % 360,
					position: wrap(add(position, multiply(newVelocity, deltaTime)), {
						right: width,
						bottom: height,
					}),
				}),
			}));
		}
	},
};
