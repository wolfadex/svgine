import * as types from 'root/ActionTypes';

export const updateTime = (time) => ({
	type: types.UPDATE_TIME,
	time,
});

export const addGameObject = (gameObject, position, rotation) => ({
	type: types.ADD_GAME_OBJECT,
	gameObject,
	position,
	rotation,
});

export const removeGameObject = (guidToRemove) => ({
	type: types.REMOVE_GAME_OBJECT,
	guidToRemove,
});

export const updateGameObject = (gameObject) => ({
	type: types.UPDATE_GAME_OBJECT,
	gameObject,
});

export const keyDown = (key) => ({
	type: types.KEY_DOWN,
	key,
});

export const keyUp = (key) => ({
	type: types.KEY_UP,
	key,
});

export const paused = (paused) => ({
	type: types.PAUSE,
	paused,
});
