import * as types from '../constants/ActionTypes';
import * as firebase from '../firebase';

const signUpRequest = () => ({ type: types.SIGN_UP_REQUEST });
const signUpSuccess = () => ({ type: types.SIGN_UP_SUCCESS });
const signUpError = error => ({ type: types.SIGN_UP_ERROR, error });
const signInRequest = () => ({ type: types.SIGN_IN_REQUEST });
const signInSuccess = () => ({ type: types.SIGN_IN_SUCCESS });
const signInError = error => ({ type: types.SIGN_IN_ERROR, error });
const signOutRequest = () => ({ type: types.SIGN_OUT_REQUEST });
const signOutSuccess = () => ({ type: types.SIGN_OUT_SUCCESS });
const signOutError = error => ({ type: types.SIGN_OUT_ERROR, error });
export const userIsFetched = () => ({ type: types.USER_FETCHED });
export const userIsLoggedOut = () => ({ type: types.USER_LOGGED_OUT });

export const signUp = (email, password) => (
  (dispatch) => {
    dispatch(signUpRequest());
    return firebase.auth.createUserWithEmailAndPassword(email, password)
      .then(() => dispatch(signUpSuccess()))
      .catch(error => dispatch(signUpError(error.message)));
  }
);

export const signIn = (email, password) => (
  (dispatch) => {
    dispatch(signInRequest());
    return firebase.auth.signInWithEmailAndPassword(email, password)
      .then(() => dispatch(signInSuccess()))
      .catch(error => dispatch(signInError(error.message)));
  }
);

export const signOut = () => (
  (dispatch) => {
    dispatch(signOutRequest());
    return firebase.auth.signOut()
      .then(() => dispatch(signOutSuccess()))
      .catch(error => dispatch(signOutError(error.message)));
  }
);
