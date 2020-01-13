import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { utcToZonedTime } from 'date-fns-tz';

import {
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';

import api from '~/services/api';

import { Types, listScheduleSuccess, listScheduleFailure } from './index';

export function* listSchedule({ payload }) {
  try {
    const { date } = payload;

    const response = yield call(api.get, 'schedule', {
      params: { date },
    });

    const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = range.map(hour => {
      const checkDate = setMilliseconds(
        setSeconds(setMinutes(setHours(date, hour), 0), 0),
        0
      );
      const compareDate = utcToZonedTime(checkDate, timezone);

      return {
        time: `${hour}:00h`,
        past: isBefore(compareDate, new Date()),
        appointment: response.data.find(a =>
          isEqual(parseISO(a.date), compareDate)
        ),
      };
    });
    yield put(listScheduleSuccess(data));
  } catch (err) {
    toast.error('Houve um erro, tente novamente em alguns minutos.');
    yield put(listScheduleFailure());
  }
}

export default all([takeLatest(Types.REQUEST, listSchedule)]);
