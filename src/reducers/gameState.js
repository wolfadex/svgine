import * as types from 'root/ActionTypes';
import { guid } from 'root/helpers';

const initialState = {
	time: null,
	gameObjects: {},
	keys: {},
};

export default function gameStateReducer(
	state = initialState,
	{
		type,
		time,
		guidToRemove,
		gameObject,
		key,
	}
) {
	switch(type) {
		case types.UPDATE_TIME:
			return Object.assign({}, state, {
				time,
			});
		case types.ADD_GAME_OBJECT:
			const newGUID = guid();

			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[newGUID]: Object.assign({}, (gameObject.init && gameObject.init(gameObject, state) || gameObject), {
						guid: newGUID,
					}),
				}),
			});
		case types.REMOVE_GAME_OBJECT:
			const {
				[guidToRemove]: toRemove,
				...remainingGameObjects
			} = state.gameObjects;

			toRemove.destroy && toRemove.destroy(state);

			return Object.assign({}, state, {
				gameObjects: remainingGameObjects,
			});
		case types.UPDATE_GAME_OBJECT:
			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[gameObject.guid]: gameObject,
				}),
			});
		case types.KEY_DOWN:
			return Object.assign({}, state, {
				keys: Object.assign({}, state.keys, {
					[key]: true,
				}),
			});
		case types.KEY_UP:
			return Object.assign({}, state, {
				keys: Object.assign({}, state.keys, {
					[key]: false,
				}),
			});
		default:
			return state;
	}
}
