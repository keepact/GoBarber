import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import schedule from './schedule';
import notification from './notification';

export default combineReducers({
  auth,
  user,
  schedule,
  notification,
});
