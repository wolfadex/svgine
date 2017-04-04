import { degreeToRadian } from './helpers';

var Vector2 = function (x = 0, y = 0) {
	return { x, y };
};

export default Vector2;

export var add = function ({
	x: x1,
	y: y1
}, {
	x: x2,
	y: y2
}) {
	return Vector2(x1 + x2, y1 + y2);
};

export var subtract = function ({
	x: x1,
	y: y1
}, {
	x: x2,
	y: y2
}) {
	return Vector2(x2 - x1, y2 - y1);
};

export var multiply = function ({
	x,
	y
}, magnitude) {
	return Vector2(x * magnitude, y * magnitude);
};

export var distance = function ({
	x: x1,
	y: y1
}, {
	x: x2,
	y: y2
}) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

export var magnitude = function ({
	x,
	y
}) {
	return Math.sqrt(x * x + y * y);
};

export var normalize = function ({
	x,
	y
}) {
	var m = magnitude({ x, y });

	return Vector2(x / m, y / m);
};

export var angleToVector = function (angle) {
	return Vector2(Math.cos(degreeToRadian(angle)), Math.sin(degreeToRadian(angle)));
};

export var max = function (vector, bound) {
	return magnitude(vector) > bound ? multiply(normalize(vector), bound) : vector;
};

export var wrap = function ({
	x,
	y
}, {
	left = 0,
	right = 1,
	top = 0,
	bottom = 1
}) {
	return Vector2(x < left ? right + x - left : x > right ? left + x - right : x, y < top ? bottom + y - top : y > bottom ? top + y - bottom : y);
};