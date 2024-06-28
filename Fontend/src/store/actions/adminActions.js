import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createUserService,
  getAllUsers,
  deleteUserService,
} from "../../services/userService";
import { toast } from "react-toastify";
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

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createUserService(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsers());
        toast.success("Create new user success!");
      } else {
        console.log("Failed to save user: ", res);
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("Failed to save user: ", e);
    }
  };
};

export const deleteUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(data);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsers());
        toast.success("Delete user success!");
      } else {
        console.log("Failed to delete user: ", res);
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log("Failed to delete user: ", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const saveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.SAVE_USER_FAILED,
});

export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users: response.users.reverse(),
      });
    } else {
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_FAILED,
      });
    }
  };
};
