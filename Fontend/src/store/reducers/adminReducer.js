import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  gender: [],
  role: [],
  position: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState1 = { ...state };
      copyState1.isLoadingGender = true;
      return {
        ...copyState1,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      // console.log(action.genderData);
      let copyState2 = { ...state };
      copyState2.gender = action.genderData;
      copyState2.isLoadingGender = false;
      // console.log("check state: ", copyState);
      return {
        ...copyState2,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      let copyState3 = { ...state };
      copyState3.gender = [];
      copyState3.isLoadingGender = false;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_FAILED:
      state.position = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.role = action.data;
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      state.role = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      return {
        ...state,
      };

    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
      };

    case actionTypes.DELETE_USER_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
