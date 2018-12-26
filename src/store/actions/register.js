import axios from "axios"
//Action
export const FETCH_REGISTER_BEGIN = "FETCH_REGISTER_BEGIN";
export const FETCH_REGISTER_SUCCESS = "FETCH_REGISTER_SUCCESS";
export const FETCH_REGISTER_FAILURE = "FETCH_REGISTER_FAILURE";

export const fetchRegisterBegin = () => ({
  type: FETCH_REGISTER_BEGIN
});

export const fetchRegisterSuccess = user => ({
  type: FETCH_REGISTER_SUCCESS,
  payload: {
    user
  }
});

export const fetchRegisterError = error => ({
  type: FETCH_REGISTER_FAILURE,
  payload: {
    error
  }
});

export function postRegister(username, password,email,first_name, last_name, gender,country) {

 
  return dispatch => {
    dispatch(fetchRegisterBegin());
    var authOptions = {
      method: 'POST',
      url: `http://localhost:3001/api/putData/`,
      data: {
        "username": username,
        "password": password,
        "email": email, 
        "first_name": first_name,
        "last_name": last_name,
        "gender": gender,
        "country": country
      },
      json: true
    };
    return axios(authOptions)
      .then(function (response) { 
        dispatch(fetchRegisterSuccess(response.data));
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response.status === 400 || error.response.status === 500) {
          errorMsg = error.response.data.error_code;
        }
        dispatch(fetchRegisterError(errorMsg));
      });
  };
}

