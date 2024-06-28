import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";

export const fetchGenderStart = () => async (dispatch, getState) => {
  // console.log(`Check get state: ` + JSON.stringify(getState()));
  return getAllCodeService("GENDER").then((res) => {
    dispatch({ type: actionTypes.FETCH_GENDER_START });
    if (res && res.errCode === 0) {
      dispatch(fetchGenderSuccess(res.data));
    } else {
      dispatch(fetchGenderFailed());
    }
  });
};

export const fetchGenderSuccess = (gender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  genderData: gender,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => async (dispatch, getState) => {
  return getAllCodeService("POSITION").then((res) => {
    if (res && res.errCode === 0) {
      dispatch(fetchPositionSuccess(res.data));
    } else {
      dispatch(fetchPositionFailed());
    }
  });
};

export const fetchPositionSuccess = (position) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: position,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => async (dispatch, getState) => {
  return getAllCodeService("ROLE").then((res) => {
    if (res && res.errCode === 0) {
      dispatch(fetchRoleSuccess(res.data));
    } else {
      dispatch(fetchRoleFailed());
    }
  });
};

export const fetchRoleSuccess = (role) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: role,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
