import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@appointment/LIST_REQUEST',
  SUCCESS: '@appointment/LIST_SUCCESS',
  FAIL: '@appointment/LIST_FAIL',
  CREATE_REQUEST: '@appointment/CREATE_REQUEST',
  CREATE_SUCCESS: '@appointment/CREATE_SUCCESS',
  CREATE_FAIL: '@appointment/CREATE_FAIL',
  DELETE_REQUEST: '@appointment/DELETE_REQUEST',
  DELETE_SUCCESS: '@appointment/DELETE_SUCCESS',
  DELETE_FAIL: '@appointment/DELETE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  appointments: '',
  loading: false,
};

export default function appointment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SUCCESS: {
        draft.appointments = action.payload.data;
        draft.loading = false;
        break;
      }
      case Types.FAIL: {
        draft.loading = false;
        break;
      }
      case Types.CREATE_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.CREATE_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.CREATE_FAIL: {
        draft.loading = false;
        break;
      }
      case Types.DELETE_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.DELETE_SUCCESS: {
        draft.loading = false;
        break;
      }
      case Types.DELETE_FAIL: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listAppointmentsRequest() {
  return {
    type: Types.REQUEST,
  };
}

export function listAppointmentsSuccess(data) {
  return {
    type: Types.SUCCESS,
    payload: { data },
  };
}

export function listAppointmentsFailure() {
  return {
    type: Types.FAIL,
  };
}

export function cancelAppointmentsRequest(id) {
  return {
    type: Types.DELETE_REQUEST,
    payload: { id },
  };
}

export function cancelAppointmentsSuccess() {
  return {
    type: Types.DELETE_SUCCESS,
  };
}

export function cancelAppointmentsFailure() {
  return {
    type: Types.DELETE_FAIL,
  };
}

export function createAppointmentsRequest(data) {
  return {
    type: Types.CREATE_REQUEST,
    payload: { data },
  };
}

export function createAppointmentsSuccess(data) {
  return {
    type: Types.CREATE_SUCCESS,
    payload: { data },
  };
}

export function createAppointmentsFailure() {
  return {
    type: Types.CREATE_FAIL,
  };
}
