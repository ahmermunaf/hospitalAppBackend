import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


// export const store = createStore(persistedReducer, {}, applyMiddleware(thunk, logger));
export const store = createStore(combineReducers(reducers), {}, applyMiddleware(thunk));