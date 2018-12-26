import axios from "axios"
//Action
export const FETCH_LOGIN_BEGIN = "FETCH_LOGIN_BEGIN";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE";
export const FETCH_LOGIN_OUT = "FETCH_LOGIN_OUT";


export const fetchLoginBegin = () => ({
  type: FETCH_LOGIN_BEGIN
});

export const fetchLoginSuccess = (login,success) => ({
  type: FETCH_LOGIN_SUCCESS,
  payload: {
    login,
    success
  }
});

export const fetchLoginError = error => ({
  type: FETCH_LOGIN_FAILURE,
  payload: {
    error
  }
});

export function fetchAccount(username,password) {

 
  return dispatch => {
    dispatch(fetchLoginBegin());
    var authOptions = {
      method: 'GET',
      url: `http://localhost:3001/api/getUser`,
      params: {
        "username": username,
        "password":password
      },
      json: true
    };

    return axios(authOptions)
      .then(function (response) { 
        dispatch(fetchLoginSuccess(response.data.data,response.data.success));
      })
      .catch(error => {
        let errorMsg = error.message;
        dispatch(fetchLoginError(errorMsg));
      });
  };
}


export function fetchLoggedOut() {
  
  return {
    type: FETCH_LOGIN_OUT
  }
}