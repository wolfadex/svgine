import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';
import Board from 'root/View/Board';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
    window.devToolsExtension ? window.devToolsExtension() : f => f,
	applyMiddleware(),
);

render(
	<Provider
		store={store}
	>
		<Board />
	</Provider>,
	document.getElementById('siteRoot')
);
