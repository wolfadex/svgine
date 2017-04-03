import { degreeToRadian } from './helpers';

const Vector2 = (x = 0, y = 0) => ({ x, y });

export default Vector2;

export const add = (
	{
		x: x1,
		y: y1,
	},
	{
		x: x2,
		y: y2,
	},
) => Vector2(x1 + x2, y1 + y2);

export const subtract = (
	{
		x: x1,
		y: y1,
	},
	{
		x: x2,
		y: y2,
	},
) => Vector2(x2 - x1, y2 - y1);

export const multiply = (
	{
		x,
		y,
	},
	magnitude,
) => Vector2(x * magnitude, y * magnitude);

export const distance = (
	{
		x: x1,
		y: y1,
	},
	{
		x: x2,
		y: y2,
	},
) => Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

export const magnitude = (
	{
		x,
		y,
	},
) => Math.sqrt(x * x + y * y);

export const normalize = (
	{
		x,
		y,
	},
) => {
	const m = magnitude({ x, y });

	return Vector2(x / m, y / m);
}

export const angleToVector = (angle) => Vector2(Math.cos(degreeToRadian(angle)), Math.sin(degreeToRadian(angle)));

export const max = (
	vector,
	bound,
) => magnitude(vector) > bound ? multiply(normalize(vector), bound) : vector;

export const wrap = (
	{
		x,
		y,
	},
	{
		left = 0,
		right = 1,
		top = 0,
		bottom = 1,
	}
) => Vector2(
		do {
			if (x < left) {
				right + x - left;
			}
			else if (x > right) {
				left + x - right;
			}
			else {
				x;
			}
		},
		do {
			if (y < top) {
				bottom + y - top;
			}
			else if (y > bottom) {
				top + y - bottom;
			}
			else {
				y;
			}
		}
	);
