import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_ERRORS,
  SET_CURRENT_USER
} from './';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(user => {
      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};


export const setCurrentUser = decodedUserData => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUserData,
  };
};

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(user => {
      const { token } = user.data;

      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decodedToken = jwt_decode(token);
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

