import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@provider/LIST_REQUEST',
  SUCCESS: '@provider/LIST_SUCCESS',
  FAIL: '@provider/LIST_FAIL',
  AVAILABLE_REQUEST: '@provider/AVAILABLE_REQUEST',
  AVAILABLE_SUCCESS: '@provider/AVAILABLE_SUCCESS',
  AVAILABLE_FAIL: '@provider/AVAILABLE_FAIL',
  REDIRECT_CONFIRM: '@provider/REDIRECT_CONFIRM',
  REDIRECT_DATETIME: '@provider/REDIRECT_DATETIME',
};

// Reducer

const INITIAL_STATE = {
  providers: [],
  provider: {},
  hours: [],
  time: '',
  loading: false,
};

export default function provider(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SUCCESS: {
        draft.providers = action.payload.data;
        draft.loading = false;
        break;
      }
      case Types.FAIL: {
        draft.loading = false;
        break;
      }
      case Types.AVAILABLE_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.AVAILABLE_SUCCESS: {
        draft.hours = action.payload.data.hours;
        draft.provider = action.payload.data.availableProvider;
        draft.loading = false;
        break;
      }
      case Types.AVAILABLE_FAIL: {
        draft.loading = false;
        break;
      }
      case Types.REDIRECT_DATETIME: {
        draft.loading = false;
        draft.provider = action.payload.data;
        break;
      }
      case Types.REDIRECT_CONFIRM: {
        draft.loading = false;
        draft.time = action.payload.time;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function listProvidersRequest() {
  return {
    type: Types.REQUEST,
  };
}

export function listProvidersSuccess(data) {
  return {
    type: Types.SUCCESS,
    payload: { data },
  };
}

export function listProvidersFailure() {
  return {
    type: Types.FAIL,
  };
}

export function listAvailableRequest(availableProvider, date) {
  return {
    type: Types.AVAILABLE_REQUEST,
    payload: { availableProvider, date },
  };
}

export function listAvailableSuccess(data) {
  return {
    type: Types.AVAILABLE_SUCCESS,
    payload: { data },
  };
}

export function listAvailableFailure() {
  return {
    type: Types.AVAILABLE_FAIL,
  };
}

export function redirectSelectDateTime(data) {
  return {
    type: Types.REDIRECT_DATETIME,
    payload: { data },
  };
}

export function redirectConfirm(time) {
  return {
    type: Types.REDIRECT_CONFIRM,
    payload: { time },
  };
}
