import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Types,
  showNotificationSuccess,
  showNotificationFailure,
  markAsReadSuccess,
  markAsReadFailure,
} from './index';

export function* showNotifications() {
  try {
    const response = yield call(api.get, 'notifications');

    const data = response.data.map(notification => ({
      ...notification,
      timeDistance: formatDistance(
        parseISO(notification.createdAt),
        new Date(),
        { addSuffix: TextTrackCue, locale: pt }
      ),
    }));
    yield put(showNotificationSuccess(data));
  } catch (err) {
    yield put(showNotificationFailure());
  }
}

export function* markAsRead({ payload }) {
  const { id } = payload;
  try {
    yield call(api.put, `notifications/${id}`);

    const { notifications } = yield select(state => state.notification);
    const currentNotifications = notifications.map(notification =>
      notification._id === id ? { ...notification, read: true } : notification
    );
    yield put(markAsReadSuccess(currentNotifications));
  } catch (err) {
    yield put(markAsReadFailure());
  }
}

export default all([
  takeLatest(Types.REQUEST, showNotifications),
  takeLatest(Types.MARK_AS_READ_REQUEST, markAsRead),
]);
