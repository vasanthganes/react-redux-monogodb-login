import {
  FETCH_LOGIN_BEGIN,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_OUT
} from "../actions/login";

const initialState = {
  user: {},
  loading: false,
  error: null,
  loggedIn:false,
  success:true
};

export default function loginReducer(state = initialState, action) {
 
  switch (action.type) {
    case FETCH_LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.login,
        loggedIn:true,
        success:action.payload.success
      };

    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_LOGIN_OUT:
    
      return {
        ...state,
        loggedIn: false
      };

    default:
      return state;
  }
}
