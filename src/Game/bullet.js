import Vector2, { add, multiply, angleToVector, max, wrap } from 'root/vector2';
import { getBounds } from 'root/View/Board';

export default {
	// Optional
	props: {
		// Custom
		speed: 1000,
		maxLife: 3,
		livedFor: 0,
	},
	// Required
	transform: {
		position: Vector2(50, 50),
		rotation: 0,
	},
	render: '4 0, -4 0',
	update:(
		deltaTime,
		gameObjectData,
		gameState,
		{
			updateGameObject,
			removeGameObject,
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
					livedFor,
					maxLife,
					speed,
				} = {},
			} = gameObjectData;
			const {
				height,
				width,
			} = getBounds();

			if (livedFor >= maxLife) {
				removeGameObject(gameObjectData.guid);
			}
			else {
				updateGameObject(Object.assign({}, gameObjectData, {
					props: Object.assign({}, gameObjectData.props, {
						livedFor: livedFor + deltaTime,
					}),
					transform: Object.assign({}, gameObjectData.transform, {
						position: wrap(add(position, multiply(multiply(angleToVector(rotation), speed), deltaTime)), {
							right: width,
							bottom: height,
						}),
					}),
				}));
			}
		}
	},
};
