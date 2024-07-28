import { actions as notifActions } from 'redux-notifications';
import { getOrCreateStore } from '../store/store';
import moment from 'moment';

const store = getOrCreateStore();

const { notifSend } = notifActions;
const { dispatch } = store;

export const logIsServer = compName => {
  console.log(`--SERVER-rendered-${compName}: `, typeof window === 'undefined');
};

export function getActiveResolutionKey() {
  const path = window.location.pathname;
  const pathParts = path.split('/');
  const last = pathParts[pathParts.length - 1];
  return last;
}

export function toQueryString(obj) {
  const query = Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');
  return '?'.concat(query);
}

export function messageOK(message) {
  console.log('messageOK called');
  notifSend({
    message,
    kind: 'success',
    dismissAfter: 3000,
  })(dispatch);
}

export function messageInfo(message) {
  notifSend({
    message,
    kind: 'info',
    dismissAfter: 3000,
  })(dispatch);
}

export function messageWarning(message) {
  notifSend({
    message,
    kind: 'warning',
    dismissAfter: 3000,
  })(dispatch);
}

export function messageDanger(message) {
  notifSend({
    message,
    kind: 'danger',
    dismissAfter: 3000,
  })(dispatch);
}

export function chunkArray(myArray, chunk_size) {
  let results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

export function getNumberOfDays(startDate, endDate) {
  const start = moment(startDate);
  const end = moment(endDate);
  const duration = moment.duration(end.diff(start));
  const numberOfDays = duration.asDays() + 1;
  return numberOfDays;
}
