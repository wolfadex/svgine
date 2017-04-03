import React, { Component } from 'react';

export const transform = (GameObject, data) =>
	class extends Component {
		render() {
			return (
				<GameObject />
			);
		}
	};
