import * as types from '../ActionTypes';

export var updateTime = function (time) {
	return {
		type: types.UPDATE_TIME,
		time
	};
};

export var addGameObject = function (gameObject, position, rotation) {
	return {
		type: types.ADD_GAME_OBJECT,
		gameObject,
		position,
		rotation
	};
};

export var removeGameObject = function (guidToRemove) {
	return {
		type: types.REMOVE_GAME_OBJECT,
		guidToRemove
	};
};

export var updateGameObject = function (gameObject) {
	return {
		type: types.UPDATE_GAME_OBJECT,
		gameObject
	};
};

export var keyDown = function (key) {
	return {
		type: types.KEY_DOWN,
		key
	};
};

export var keyUp = function (key) {
	return {
		type: types.KEY_UP,
		key
	};
};

export var paused = function (paused) {
	return {
		type: types.PAUSE,
		paused
	};
};