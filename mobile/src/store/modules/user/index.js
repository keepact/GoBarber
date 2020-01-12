import produce from 'immer';

// Action Types

export const Types = {
  SIGN_IN_SUCCESS: '@auth/SIGN_IN_SUCCESS',
  UPDATE_PROFILE_SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  SIGN_OUT: '@auth/SIGN_OUT',
};

// Reducer

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Types.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case Types.UPDATE_PROFILE_SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      case Types.SIGN_OUT: {
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
