import {
  all,
  call,
  delay,
  select,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { adActions, userActions } from './actions';
import api from '../../api';
import moment from 'moment';
import mockData from '../mockData/adListData.json';
import { USE_MOCK_DATA } from '../constants';
import { getUID } from './selectors';
import Router from 'next/router';

const { fetchAds, fetchAd, fetchUserAds } = adActions;

function* createNewAd() {
  try {
    const uid = yield select(getUID);
    let createdAdId = yield api.ad.createAd({ ownerId: uid });

    const url = `/edit?id=${createdAdId}`;
    Router.push(url, url, { shallow: true });
  } catch (e) {
    yield put(adActions.createNewAd.failure(e));
  }
}

function* updateAd({ payload }) {
  try {
    yield api.ad.updateAd(payload);
    yield put(adActions.updateAd.success(null));
    yield fetchAdData({ payload: payload.adId });
  } catch (err) {
    yield put(adActions.updateAd.failure(err));
  }
}

function* fetchAdsData() {
  try {
    let res = yield api.ad.fetchAds();
    res = USE_MOCK_DATA ? mockData : res;
    yield put(fetchAds.success(res));
  } catch (e) {
    yield put(fetchAds.failure(e));
  }
}

function* fetchUserAdsData() {
  const uid = yield select(getUID);
  try {
    let res = yield api.ad.fetchUserAds(uid);
    yield put(fetchUserAds.success(res));
  } catch (e) {
    yield put(fetchUserAds.failure(e));
    console.error('-----fetchUserAds.failure: ', e);
  }
}

function* fetchAdData({ payload }) {
  try {
    let data = yield api.ad.fetchAd(payload);
    yield put(fetchAd.success({ adId: payload, data }));
  } catch (e) {
    yield put(fetchAd.failure(e));
  }
}

function* handleLoginFlow({ payload: user }) {
  const uid = user && user.uid;
  if (!uid) return;

  try {
    const profile = yield api.user.fetchUserProfile(uid);

    if (profile) {
      const profile = yield api.user.fetchUserProfile(uid);
      const permissions = yield api.user.fetchUserPermissions(uid);

      yield put(userActions.fetchUserProfile.success(profile));
      yield put(userActions.fetchUserPermissions.success(permissions));
      yield put(userActions.setIsFirstLogin(false));
    } else {
      yield put(userActions.setIsFirstLogin(true));
      const firstName = user.displayName.split(' ')[0];
      const lastName = user.displayName.split(' ')[1];
      // remove falsy values from object otherwise firebase will complain
      for (var k in user) {
        if (user.hasOwnProperty(k) && !user[k]) {
          delete user[k];
        }
      }

      yield api.user.createUserProfile({
        ...user,
        firstName,
        lastName,
        firstLogin: moment().format(),
        lastLogin: moment().format(),
      });
    }
  } catch (err) {
    yield put(userActions.fetchUserProfile.failure(err));
  }
}

function* fetchUserProfile({ payload: uid }) {
  try {
    const profile = yield api.user.fetchUserProfile(uid);
    yield put(userActions.fetchUserProfile.success(profile));
  } catch (err) {
    yield put(userActions.fetchUserProfile.failure(err));
  }
}

function* updateUserProfilePicture({ payload: { uid, image } }) {
  try {
    yield api.user.updateProfilePicture(uid, image);
    yield put(userActions.updateUserProfilePicture.success());
    yield fetchUserProfile({ payload: uid });
  } catch (err) {
    yield put(userActions.updateUserProfile.failure(err));
  }
}

// payload data should include uid
function* updateUserProfile({ payload }) {
  try {
    yield api.user.updateUserProfile(payload);
    yield fetchUserProfile({ payload: payload.uid });
  } catch (err) {
    yield put(userActions.updateUserProfile.failure(err));
  }
}

function* updateAdImages({ payload }) {
  try {
    yield api.ad.updateAdImages(payload);
    yield put(adActions.updateAdImages.success(null));
    yield fetchAdData({ payload: payload.adId });
  } catch (err) {
    yield put(adActions.updateAdImages.failure(err));
  }
}

function* deleteAdImage({ payload }) {
  try {
    yield api.ad.deleteAdImage(payload);
    yield put(adActions.deleteAdImage.success(null));
    yield fetchAdData({ payload: payload.adId });
  } catch (err) {
    yield put(adActions.deleteAdImage.failure(err));
  }
}

function* rootSaga() {
  yield all([takeLatest(adActions.fetchAds.request.type, fetchAdsData)]);
  yield all([takeEvery(adActions.fetchAd.request.type, fetchAdData)]);
  yield all([
    takeLatest(adActions.fetchUserAds.request.type, fetchUserAdsData),
  ]);
  yield all([takeLatest(adActions.createNewAd.request.type, createNewAd)]);
  yield all([takeLatest(adActions.updateAd.request.type, updateAd)]);
  yield all([
    takeLatest(adActions.updateAdImages.request.type, updateAdImages),
  ]);
  yield all([takeLatest(adActions.deleteAdImage.request.type, deleteAdImage)]);
  yield all([
    takeLatest(userActions.fetchUserProfile.request.type, fetchUserProfile),
  ]);
  yield all([
    takeLatest(userActions.updateUserProfile.request.type, updateUserProfile),
  ]);
  yield all([
    takeLatest(
      userActions.updateUserProfilePicture.request.type,
      updateUserProfilePicture,
    ),
  ]);
  yield all([
    takeLatest(userActions.saveUserInfoFromLoginProvider, handleLoginFlow),
  ]);
}

export default rootSaga;
