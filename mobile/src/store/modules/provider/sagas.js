import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

import {
  Types,
  listProvidersSuccess,
  listProvidersFailure,
  listAvailableSuccess,
  listAvailableFailure,
} from './index';

export function* listProviders() {
  try {
    const response = yield call(api.get, 'providers');

    const provider = response.data;

    yield put(listProvidersSuccess(provider));
  } catch (err) {
    yield put(listProvidersFailure());
  }
}

export function* listProvidersAvailable({ payload }) {
  try {
    const { availableProvider, date } = payload;

    const response = yield call(
      api.get,
      `providers/${availableProvider.id}/available`,
      {
        params: {
          date: date.getTime(),
        },
      }
    );

    const hours = response.data;

    const available = {
      hours,
      availableProvider,
    };

    yield put(listAvailableSuccess(available));
  } catch (err) {
    yield put(listAvailableFailure());
  }
}

export function redirectSelectDateTime() {
  NavigationService.navigate('SelectDateTime');
}

export function redirectConfirm() {
  NavigationService.navigate('Confirm');
}

export default all([
  takeLatest(Types.REQUEST, listProviders),
  takeLatest(Types.AVAILABLE_REQUEST, listProvidersAvailable),
  takeLatest(Types.REDIRECT_DATETIME, redirectSelectDateTime),
  takeLatest(Types.REDIRECT_CONFIRM, redirectConfirm),
]);
