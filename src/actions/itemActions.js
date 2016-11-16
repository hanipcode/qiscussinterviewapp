import { ITEM } from '../constants';
import * as api from '../api';

export function startGet() {
  return {
    type: ITEM.START,
  };
}

export function failedGet() {
  return {
    type: ITEM.FAILED,
  };
}

export function getItem(data) {
  return {
    type: ITEM.GET,
    data,
  };
}

export function startPost() {
  return {
    type: ITEM.START_POST,
  };
}

export function failedPost() {
  return {
    type: ITEM.FAILED_POST,
  };
}

export function successPost() {
  return {
    type: ITEM.SUCCESS_POST,
  };
}

export function fetchItem() {
  return async (dispatch) => {
    const response = await api.getItem();
    if (response.status !== 200) {
      dispatch(failedGet());
    } else {
      const data = await response.json();
      dispatch(getItem(data));
    }
  };
}

export function post(name, price) {
  return async (dispatch) => {
    dispatch(startPost());
    const response = await api.postItem(name, price);
    console.log(response);
    if (response.status !== 200) {
      dispatch(failedPost());
    } else {
      const data = await response.json();
      dispatch(successPost);
      dispatch(fetchItem());
    }
  };
}
