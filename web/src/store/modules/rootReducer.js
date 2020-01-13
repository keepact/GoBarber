import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import schedule from './schedule';

export default combineReducers({
  auth,
  user,
  schedule,
});
