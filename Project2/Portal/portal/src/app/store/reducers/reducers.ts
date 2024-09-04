import { combineReducers } from 'redux';
import { app, extensionsRegistration } from '../../../core/store';
import { userProfile } from './userProfile.reducer';
import { notifications } from './notifications.reducer';
import { userPrevilige } from './userPrevilege.reducer';

export const reducers = combineReducers({
  app,
  extensionsRegistration,
  userProfile,
  notifications,
  userPrevilige
});

