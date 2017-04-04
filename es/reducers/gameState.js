function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import * as types from '../ActionTypes';
import { guid } from '../helpers';

var initialState = {
	gameObjects: {},
	keys: {},
	paused: false,
	time: null
};

export default function gameStateReducer(state = initialState, {
	gameObject,
	guidToRemove,
	key,
	paused,
	position,
	rotation,
	time,
	type
}) {
	switch (type) {
		case types.UPDATE_TIME:
			return Object.assign({}, state, {
				time
			});
		case types.PAUSE:
			return Object.assign({}, state, {
				paused
			});
		case types.ADD_GAME_OBJECT:
			var newGUID = guid();

			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[newGUID]: Object.assign({}, gameObject, {
						transform: Object.assign({}, gameObject.transform, {
							rotation: rotation != null ? rotation : gameObject.transform.rotation,
							position: position != null ? position : gameObject.transform.position
						})
					}, gameObject.init && gameObject.init(gameObject, state), {
						guid: newGUID
					})
				})
			});
		case types.REMOVE_GAME_OBJECT:
			var _state$gameObjects = state.gameObjects,
			    {
				[guidToRemove]: toRemove
			} = _state$gameObjects,
			    remainingGameObjects = _objectWithoutProperties(_state$gameObjects, [guidToRemove]);

			toRemove.destroy && toRemove.destroy(state);

			return Object.assign({}, state, {
				gameObjects: remainingGameObjects
			});
		case types.UPDATE_GAME_OBJECT:
			return Object.assign({}, state, {
				gameObjects: Object.assign({}, state.gameObjects, {
					[gameObject.guid]: gameObject
				})
			});
		case types.KEY_DOWN:
			return Object.assign({}, state, {
				keys: Object.assign({}, state.keys, {
					[key]: true
				})
			});
		case types.KEY_UP:
			return Object.assign({}, state, {
				keys: Object.assign({}, state.keys, {
					[key]: false
				})
			});
		default:
			return state;
	}
}
module.exports = exports['default'];