import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './index.reducers';

const composeEnhancers = composeWithDevTools || compose;
const enhancers = [applyMiddleware(thunk)];
const store = createStore(rootReducer, composeEnhancers(...enhancers));
export default store;
