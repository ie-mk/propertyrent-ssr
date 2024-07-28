import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { adsReducer, layoutReducer, mapReducer, userReducer } from './reducer';

import { reducer as notifReducer } from 'redux-notifications';

const reducersCombined = combineReducers({
  user: userReducer,
  ads: adsReducer,
  map: mapReducer,
  form,
  layout: layoutReducer,
  notifs: notifReducer,
});

export default reducersCombined;
