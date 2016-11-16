import { Map, List, fromJS } from 'immutable';
import { ITEM } from '../constants';

const initialState = Map({
  is_loading: false,
  data: List(),
  is_error: false,
  is_posting: null,
});

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM.START :
      return state.withMutations(state =>
        state.set('is_loading', true)
              .set('is_error', false)
              .set('is_posting', null)
      );
    case ITEM.FAILED:
      return state.withMutations(state =>
        state.set('is_loading', false)
              .set('is_error', true)
      );
    case ITEM.GET:
      return state.withMutations(state =>
        state.set('is_loading', false)
              .set('data', fromJS(action.data))
      );
    case ITEM.START_POST:
      return state.withMutations(state =>
        state.set('is_posting', true)
              .set('is_error', false)
      );
    case ITEM.FAILED_POST:
      return state.withMutations(state =>
        state.set('is_posting', false)
              .set('is_error', true)
      );
    case ITEM.SUCCESS_POST:
      return state.withMutations(state =>
        state.set('is_posting', false)
              .set('is_error', false)
      );
    default:
      return state;
  }
};

export default itemReducer;
