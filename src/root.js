import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Iterable } from 'immutable';
import { autoRehydrate, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';
import App from './containers/App';

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};
    Object.keys(state).forEach((i) => {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    });
    return newState;
  },
});

const middleware = __DEV__ ? [thunk, logger] : [thunk];
const store = createStore(
  reducers,
  compose(
    autoRehydrate(),
    applyMiddleware(...middleware)
  )
);

persistStore(store, { blackList: ['itemReducer'], storage: AsyncStorage, transforms: [immutableTransform()] });


const root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default root;
