import { createStore, applyMiddleware, Dispatch, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Middleware } from 'redux';
import { reducers } from '.';

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger as Middleware<{}, any, Dispatch<AnyAction>>);
}

export const configureStore = () => {
  let store = createStore(reducers, applyMiddleware(...middlewares));
  return { store };
};

