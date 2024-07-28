import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducersCombined';
import createSagaMiddleware from 'redux-saga';
import { loadState, subscribeToSaveOnLocalStorage } from './localStorage';
import mockReduxState from '../mockData/mockReduxState';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistWhitelist = {
  user: true,
  form: true,
  ads: true,
};

const persistBlackList = {};

const initStore = initialState => {
  let persistedState = {};

  if (!isServer) {
    persistedState = loadState(persistWhitelist, persistBlackList);
  }

  const store = createStore(
    reducer,
    { ...initialState, ...mockReduxState, ...persistedState },
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    const store = initStore(initialState);
    subscribeToSaveOnLocalStorage(store, persistWhitelist, persistBlackList);

    window[__NEXT_REDUX_STORE__] = store;
  }
  return window[__NEXT_REDUX_STORE__];
}
