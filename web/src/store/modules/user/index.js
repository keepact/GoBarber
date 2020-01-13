import produce from 'immer';

// Action Types

export const Types = {
  REQUEST: '@UPDATE_PROFILE_REQUEST',
  SUCCESS: '@UPDATE_PROFILE_SUCCESS',
  FAIL: '@UPDATE_PROFILE_FAIL',
};

// Reducer

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.REQUEST: {
        draft.profile = action.payload.user;
        break;
      }
      case Types.SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      case Types.FAIL: {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}

// Action Creators

export function updateProfileRequest(data) {
  return {
    type: Types.REQUEST,
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: Types.SUCCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: Types.FAIL,
  };
}
