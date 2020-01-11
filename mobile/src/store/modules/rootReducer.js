import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import appointment from './appointment';
import provider from './provider';

export default combineReducers({
  auth,
  user,
  appointment,
  provider,
});
