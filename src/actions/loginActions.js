import { Map } from 'immutable';
import { LOGIN } from '../constants';

export function startLogin() {
  return {
    type: LOGIN.START,
  };
}

export function addAccount(uname, password) {
  return {
    type: LOGIN.REGISTER,
    data: {
      uname,
      password,
    },
  };
}

export function startRegister() {
  return {
    type: LOGIN.START_REGISTER,
  };
}

export function logout() {
  return {
    type: LOGIN.LOGOUT,
  };
}

export function getLogin(data) {
  return {
    type: LOGIN.LOGIN,
    data,
  };
}

export function loginFailed() {
  return {
    type: LOGIN.FAILED,
  };
}

export function login(uname, password) {
  return async (dispatch, getState) => {
    const loginItem = Map({
      uname,
      password,
    });
    const loginState = getState().loginReducer;
    const finded = loginState.get('accounts').find(obj => (
       obj.get('uname') === uname && obj.get('password') === password
    ));
    if (finded) {
      dispatch(getLogin(loginItem));
    } else {
      dispatch(loginFailed());
    }
  };
}
