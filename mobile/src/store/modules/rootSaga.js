import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import appointment from './appointment/sagas';
import provider from './provider/sagas';

export default function* rootSaga() {
  return yield all([auth, user, appointment, provider]);
}
