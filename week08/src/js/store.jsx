import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { reducer as api, setAxiosConfig } from 'redux-json-api';

const reducer = combineReducers({
    api
});

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(setAxiosConfig({
    baseURL: 'https://mht.uzi.uni-halle.de/client-seitige-web-anwendungen/api/example'
}));

export default store;
