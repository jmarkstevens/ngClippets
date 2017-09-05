import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { startIpc, ipcMiddleware } from './api/api.ipc';

import snipState from './snipview/snip.Reducer';
import treeState from './treeview/tree.Reducer';

const reducer = combineReducers({ snipState, treeState });
const middleware = [ipcMiddleware, thunkMiddleware];

const useLogger = 1;
if (useLogger) middleware.push(logger);

const store = createStore(reducer, applyMiddleware(...middleware));

startIpc(store);

store.dispatch({ type: 'ApiGetSnipData' });

export default store;
