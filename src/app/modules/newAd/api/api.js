// import { browserHistory } from 'react-router';
// import auth from '../../../firebase/auth';
import db from '../../../../firebase/db';
import storage from '../../../../firebase/storage';
import { getOrCreateStore } from '../../../store/store';
// import { Creators as userActions } from '../../../modules/login/store/actions';

//import { messageOK, messageWarning } from 'helpers';

// OLD PROJECT
// import store from '../redux/store';
// import auth from '../firebase/auth';
// import db from '../firebase/db';
// import stor from '../firebase/stor';

// import {
//   loginUserFailure,
//   loginUserSuccess,
//   fetchUserSuccess,
//   fetchUserFailure,
//   logoutUserSuccess,
//   logoutUserFailure,
// } from '../redux/userAuth/actionCreators';

import { Creators as adActions } from '../store/actions';

const {
  fetchAdSuccess,
  fetchAdFailure,
  fetchUserAdsSuccess,
  fetchUserAdsFailure,
  createUserAdSuccess,
  createUserAdFailure,
  // updateUserAdSuccess,
  // updateUserAdFailure,
  deleteUserAdSuccess,
  deleteUserAdFailure,
  fetchAdsSuccess,
  fetchAdsFailure,
  // clearUserAds,
} = adActions;

const { dbRef } = db;
const { storRef } = storage;
const { dispatch } = getOrCreateStore();

export function createNewAd(values, uid) {
  const images = values.images;
  delete values.images; //eslint-disable-line
  const newAdKey = dbRef('ads').push().key;
  const newAd = {};
  newAd[`/ads/${newAdKey}`] = { ...values };
  newAd[`/user_ads/${uid}/${newAdKey}`] = { ...values };

  debugger;
  dbRef()
    .update(newAd)
    .then(
      () => {
        // const handleImageUpload = (image, resolve, reject) => {
        //   const newImageKey = dbRef(`ads/${newAdKey}/images`).push().key;
        //   storRef(`/images/${newImageKey}`)
        //     .put(image)
        //     .then(
        //       snapshot => {
        //         const pathAds = `/ads/${newAdKey}/images/${newImageKey}`;
        //         const pathUserAds = `/user_ads/${uid}/${newAdKey}/images/${newImageKey}`;
        //         const imgUrl = {};
        //         imgUrl[pathAds] = snapshot.downloadURL;
        //         imgUrl[pathUserAds] = snapshot.downloadURL;
        //         dbRef()
        //           .update(imgUrl)
        //           .then(
        //             () => resolve(),
        //             error => reject(error),
        //           );
        //       },
        //       error => reject(error),
        //     );
        // };
        // const promiseList = Object.keys(images).map(key => {
        //   const image = images[key];
        //   const promise = new Promise((resolve, reject) => {
        //     handleImageUpload(image, resolve, reject);
        //   });
        //   return promise;
        // });
        //
        // Promise.all(promiseList).then(
        //   () => dispatch(createUserAdSuccess()),
        //   error => {
        //     dispatch(createUserAdFailure());
        //     throw new Error(error);
        //   },
        // );
      },
      error => {
        dispatch(createUserAdFailure());
        throw new Error(error);
      },
    );
}

export function fetchAd(adKey) {
  dbRef(`ads/${adKey}`)
    .once('value')
    .then(
      snapshot => dispatch(fetchAdSuccess(snapshot.val())),
      error => {
        dispatch(fetchAdFailure());
        throw new Error(error);
      },
    );
}

export function fetchAds() {
  dbRef('/ads')
    .once('value')
    .then(
      snapshot => dispatch(fetchAdsSuccess(snapshot.val())),
      error => {
        dispatch(fetchAdsFailure());
        throw new Error(error);
      },
    );
}

export function fetchUserAds(uid) {
  dbRef(`/user_ads/${uid}`)
    .once('value')
    .then(
      snapshot => dispatch(fetchUserAdsSuccess(snapshot.val())),
      error => {
        dispatch(fetchUserAdsFailure());
        throw new Error(error);
      },
    );
  // dbRef('/user_ads').once('value').then(
  //   snapshot => {

  //     .then(
  //       snapshot => dispatch(fetchAdsSuccess(snapshot.val())),
  //       error => {
  //         dispatch(fetchAdsFailure());
  //         throw new Error(error);
  //       },
  //     )
  //   },
  //   error => {
  //     dispatch(fetchAdsFailure());
  //     throw new Error(error);
  //   },
  // );
}

export function userAdsListener(uid) {
  const userAdsRef = dbRef(`/user_ads/${uid}`);
  userAdsRef.on(
    'value',
    snapshot => dispatch(fetchUserAdsSuccess(snapshot.val())),
    error => {
      dispatch(fetchUserAdsFailure());
      throw new Error(error);
    },
  );
  return userAdsRef;
}

export function deleteAd(uid, key) {
  const updates = {};
  updates[`/ads/${key}`] = null;
  updates[`/user_ads/${uid}/${key}`] = null;
  dbRef('/')
    .update(updates)
    .then(
      () => dispatch(deleteUserAdSuccess()),
      error => {
        dispatch(deleteUserAdFailure());
        throw new Error(error);
      },
    );
}
