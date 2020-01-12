import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import appointment from './appointment';
import provider from './provider';

export default combineReducers({
  auth,
  user,
  appointment,
  provider,
});
