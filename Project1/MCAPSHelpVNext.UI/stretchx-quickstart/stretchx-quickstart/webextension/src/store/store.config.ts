import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import { logger } from 'redux-logger';
import { Middleware } from 'redux';
const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const configureStore = () => {
  let store = createStore(reducers, applyMiddleware(...middlewares));
  return { store };
};
