import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Types,
  updateProfileSuccess,
  updateProfileFailure,
  showAvatarSuccess,
  showAvatarFailure,
  updateAvatarSuccess,
  updateAvatarFailure,
} from './index';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    // eslint-disable-next-line prefer-object-spread
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucess!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export function* showAvatar({ payload }) {
  const { id, url } = payload.data;
  try {
    const avatar = {
      id,
      url,
    };
    yield put(showAvatarSuccess(avatar));
  } catch (err) {
    yield put(showAvatarFailure());
  }
}

export function* updateAvatar({ payload }) {
  const { data: dataFile } = payload;
  try {
    const data = new FormData();

    data.append('file', dataFile);

    const response = yield call(api.post, 'files', data);

    const { id, url } = response.data;

    const newAvatar = {
      id,
      url,
    };

    yield put(updateAvatarSuccess(newAvatar));
  } catch (err) {
    yield put(updateAvatarFailure());
  }
}

export default all([
  takeLatest(Types.REQUEST, updateProfile),
  takeLatest(Types.AVATAR_REQUEST, showAvatar),
  takeLatest(Types.UPDATE_AVATAR_REQUEST, updateAvatar),
]);
