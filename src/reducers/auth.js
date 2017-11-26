import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_ERROR,
  SIGN_OUT_ERROR,
  USER_FETCHED,
  USER_LOGGED_OUT,
} from '../constants/ActionTypes';

const initialState = {
  name: null,
  isLoggedIn: false,
  isFetched: false,
  isFetching: false,
  error: false,
  errorMessage: undefined,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_FETCHED:
      return {
        ...state,
        isLoggedIn: true,
        isFetched: true,
      };

    case USER_LOGGED_OUT:
      return {
        ...state,
        isFetched: false,
        isLoggedIn: false,
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isLoggedIn: true,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isLoggedIn: false,
        error: true,
        errorMessage: action.error,
      };

    case SIGN_IN_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isLoggedIn: true,
      };

    case SIGN_IN_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isLoggedIn: false,
        error: true,
        errorMessage: action.error,
      };

    case SIGN_OUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isLoggedIn: false,
      };

    case SIGN_OUT_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.error,
      };

    default:
      return state;
  }
}
