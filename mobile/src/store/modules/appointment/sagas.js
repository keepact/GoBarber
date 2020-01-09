import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import {
  Types,
  listAppointmentsSuccess,
  listAppointmentsFailure,
  cancelAppointmentsSuccess,
  cancelAppointmentsFailure,
} from './index';

export function* listAppointments() {
  try {
    const response = yield call(api.get, 'appointments');

    const data = response.data.map(appointment => ({
      ...appointment,
      provider: {
        ...appointment.provider,
        avatar: {
          url: appointment.provider.avatar
            ? `${api.defaults.baseURL}/files/${appointment.provider.avatar.path}`
            : `https://api.adorable.io/avatars/50/${appointment.provider.name}`,
        },
      },
    }));

    yield put(listAppointmentsSuccess(data));
  } catch (err) {
    yield put(listAppointmentsFailure());
  }
}

export function* cancelAppointments({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `appointments/${id}`);

    yield put(cancelAppointmentsSuccess(response.data));

    if (response.status === 200) {
      yield put(listAppointments());
    }
  } catch (err) {
    yield put(cancelAppointmentsFailure());
  }
}

export default all([
  takeLatest(Types.REQUEST, listAppointments),
  takeLatest(Types.DELETE_REQUEST, cancelAppointments),
]);
