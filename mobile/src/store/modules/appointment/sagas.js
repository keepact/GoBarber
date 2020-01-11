import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

import * as Appointments from './index';

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

    yield put(Appointments.listAppointmentsSuccess(data));
  } catch (err) {
    yield put(Appointments.listAppointmentsFailure());
  }
}

export function* createAppointment({ payload }) {
  try {
    const { data } = payload;

    const response = yield call(api.post, 'appointments', {
      provider_id: data.provider.id,
      date: data.time,
    });

    yield put(Appointments.createAppointmentsSuccess(response.data));
    NavigationService.navigate('Dashboard');
  } catch (err) {
    yield put(Appointments.createAppointmentsFailure());
  }
}

export function* cancelAppointments({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `appointments/${id}`);

    yield put(Appointments.cancelAppointmentsSuccess(response.data));
    yield put(Appointments.listAppointmentsRequest());
  } catch (err) {
    yield put(Appointments.cancelAppointmentsFailure());
  }
}

export default all([
  takeLatest(Appointments.Types.REQUEST, listAppointments),
  takeLatest(Appointments.Types.CREATE_REQUEST, createAppointment),
  takeLatest(Appointments.Types.DELETE_REQUEST, cancelAppointments),
]);
