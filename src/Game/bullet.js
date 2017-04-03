import Vector2, { add, multiply, angleToVector, max, wrap } from 'root/vector2';
import { getBounds } from 'root/View/Board';

export default {
	// Optional
	props: {
		// Custom
		velocity: Vector2(),
	},
	// Required
	transform: {
		position: Vector2(),
		rotation: 0,
	},
	path: 'M4 0 L-4 0 Z',
	// update:(
	// 	deltaTime,
	// 	gameObjectData,
	// ) => {
	// 	const {
	// 		transform: {
	// 			rotation,
	// 			position,
	// 		} = {},
	// 		props: {
	// 			velocity,
	// 		} = {},
	// 	} = gameObjectData;
	// 	const {
	// 		height,
	// 		width,
	// 	} = getBounds();
	//
	// 	return Object.assign({}, gameObjectData, {
	// 		transform: Object.assign({}, gameObjectData.transform, {
	// 			position: wrap(add(position, multiply(velocity, deltaTime)), {
	// 				right: width,
	// 				bottom: height,
	// 			}),
	// 		}),
	// 	});
	// },
};
