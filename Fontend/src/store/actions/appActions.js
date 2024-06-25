import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const setAppLanguage = (changeLanguage) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language: changeLanguage,
  };
};

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});
