import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@notification/NOTIFICATION_REQUEST',
  SUCCESS: '@notification/NOTIFICATION_SUCCESS',
  FAIL: '@notification/NOTIFICATION_FAIL',
  MARK_AS_READ_REQUEST: '@notification/MARK_AS_READ_REQUEST',
  MARK_AS_READ_SUCCESS: '@notification/MARK_AS_READ_SUCCESS',
  MARK_AS_READ_FAILURE: '@notification/MARK_AS_READ_FAILURE',
};

// Reducer

const INITIAL_STATE = {
  notifications: [],
};

export default function notification(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SUCCESS: {
        draft.notifications = action.payload.data;
        break;
      }
      case Types.MARK_AS_READ_SUCCESS: {
        draft.notifications = action.payload.data;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function showNotificationRequest() {
  return {
    type: Types.REQUEST,
  };
}

export function showNotificationSuccess(data) {
  return {
    type: Types.SUCCESS,
    payload: { data },
  };
}

export function showNotificationFailure() {
  return {
    type: Types.FAIL,
  };
}

export function markAsReadRequest(id) {
  return {
    type: Types.MARK_AS_READ_REQUEST,
    payload: { id },
  };
}

export function markAsReadSuccess(data) {
  return {
    type: Types.MARK_AS_READ_SUCCESS,
    payload: { data },
  };
}

export function markAsReadFailure() {
  return {
    type: Types.MARK_AS_READ_FAILURE,
  };
}
