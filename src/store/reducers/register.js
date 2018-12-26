import {
  FETCH_REGISTER_BEGIN,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE
} from "../actions/register";

const initialState = {
  user: {},
  loading: false,
  error: null
};

export default function registerReducer(state = initialState, action) {

  switch (action.type) {
    case FETCH_REGISTER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };

    case FETCH_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}