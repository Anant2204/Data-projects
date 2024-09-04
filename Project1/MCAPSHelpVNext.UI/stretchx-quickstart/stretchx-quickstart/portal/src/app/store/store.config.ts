import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Middleware } from 'redux';
import { reducers } from '.';

const middlewares: Middleware[] = [thunk];

let Logger : any = logger;
if (process.env.NODE_ENV === `development`) {
    middlewares.push(Logger);
}

export const configureStore = () => {
  let store = createStore(reducers, applyMiddleware(...middlewares));
  return { store };
};



