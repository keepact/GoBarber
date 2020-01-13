import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@schedule/SCHEDULE_REQUEST',
  SUCCESS: '@schedule/SCHEDULE_SUCCESS',
  FAIL: '@schedule/SCHEDULE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  schedule: [],
  loading: false,
};

export default function schedule(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SUCCESS: {
        draft.schedule = action.payload.data;
        draft.loading = false;
        break;
      }
      case Types.FAIL: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listScheduleRequest(date) {
  return {
    type: Types.REQUEST,
    payload: { date },
  };
}

export function listScheduleSuccess(data) {
  return {
    type: Types.SUCCESS,
    payload: { data },
  };
}

export function listScheduleFailure() {
  return {
    type: Types.FAIL,
  };
}
