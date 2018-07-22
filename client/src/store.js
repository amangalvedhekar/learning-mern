import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './reducers';

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(...middleWare),
  ),
);

export default store;
