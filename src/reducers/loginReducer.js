import { Map, fromJS, List } from 'immutable';
import { LOGIN } from '../constants';

const initialState = Map({
  is_login: false,
  accounts: fromJS([
    Map({
      uname: 'test',
      password: 'test',
    }),
    // Map({
    //  uname: '',
    //  password: '',
    // }),
  ]),
  is_error: false,
  is_register: false,
})

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.START:
      return state.withMutations(state =>
        state.set('is_login', false)
        .set('is_error', false)
      );
    case LOGIN.LOGIN:
      return state.withMutations(state =>
        state.set('is_login', true)
        .set('is_error', false)
      );
    case LOGIN.FAILED:
      return state.withMutations(state =>
        state.set('is_error', true)
      );
    case LOGIN.REGISTER:
      return state.update('accounts', '', current =>
        current.push(fromJS(action.data)))
        .set('is_register', false);
    case LOGIN.START_REGISTER:
      return state.set('is_register', true);
    case LOGIN.LOGOUT:
      return state.withMutations(state =>
        state.set('is_login', false)
              .set('is_error', true)
      );
    default:
      return state;
  }
}

export default loginReducer;
