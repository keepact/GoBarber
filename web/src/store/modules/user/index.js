import produce from 'immer';
import { Types as authTypes } from '../auth';

// Action Types

export const Types = {
  REQUEST: '@user/UPDATE_PROFILE_REQUEST',
  SUCCESS: '@user/UPDATE_PROFILE_SUCCESS',
  FAIL: '@user/UPDATE_PROFILE_FAILURE',
  AVATAR_REQUEST: '@user/SHOW_AVATAR_REQUEST',
  AVATAR_SUCCESS: '@user/SHOW_AVATAR_SUCCESS',
  AVATAR_FAIL: '@user/SHOW_AVATAR_FAIL',
  UPDATE_AVATAR_REQUEST: '@user/UPDATE_AVATAR_REQUEST',
  UPDATE_AVATAR_SUCCESS: '@user/UPDATE_AVATAR_SUCCESS',
  UPDATE_AVATAR_FAIL: '@user/UPDATE_AVATAR_FAIL',
};

// Reducer

const INITIAL_STATE = {
  profile: null,
  avatar: {},
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case authTypes.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      case Types.SUCCESS: {
        draft.profile = action.payload.profile;
        break;
      }
      case authTypes.SIGN_OUT: {
        draft.profile = null;
        break;
      }
      case Types.AVATAR_SUCCESS: {
        draft.avatar = action.payload.avatar;
        break;
      }
      case Types.UPDATE_AVATAR_SUCCESS: {
        draft.avatar = action.payload.newAvatar;
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

export function showAvatarRequest(data) {
  return {
    type: Types.AVATAR_REQUEST,
    payload: { data },
  };
}

export function showAvatarSuccess(avatar) {
  return {
    type: Types.AVATAR_SUCCESS,
    payload: { avatar },
  };
}

export function showAvatarFailure() {
  return {
    type: Types.AVATAR_FAIL,
  };
}

export function updateAvatarRequest(data) {
  return {
    type: Types.UPDATE_AVATAR_REQUEST,
    payload: { data },
  };
}

export function updateAvatarSuccess(newAvatar) {
  return {
    type: Types.UPDATE_AVATAR_SUCCESS,
    payload: { newAvatar },
  };
}

export function updateAvatarFailure() {
  return {
    type: Types.UPDATE_AVATAR_FAIL,
  };
}
