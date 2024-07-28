import { browserHistory } from 'react-router';
import auth from '../../../../firebase/auth';
import db from '../../../../firebase/db';
// import storage from '../../../firebase/storage';
import { Creators as userActions } from '../../../modules/login/store/actions';
import { getOrCreateStore } from '../../../store/store';

//import { messageOK, messageWarning } from 'helpers';

const {
  fetchUserAttempt,
  fetchUserSuccess,
  fetchUserFailure,

  loginUserAttempt,
  loginUserSuccess,
  loginUserFailure,

  logoutUserAttempt,
  logoutUserSuccess,
  logoutUserFailure,

  updatePasswordAttempt,
  updatePasswordSuccess,
  updatePasswordFailure,

  registerAttempt,
  registerSuccess,
  registerFailure,

  setFirstVisitSuccess,
  setPermissionsSuccess,

  fetchUserPreferencesSuccess,
} = userActions;

const { dbRef } = db;
//const { storageRef } = storage;
const { dispatch, store } = getOrCreateStore();

export function sendEmail(newUserEmail) {
  const addressees = ['justinas.simutis@gmail.com'];
  const subject = 'New user registration';
  const text = `New user with the following email: ${newUserEmail}, has registered on the property rent website.`;
  auth.sendEmail(addressees, text, subject);
}

export function fetchUserPreferences(uid) {
  return dbRef(`users/${uid}`)
    .once('value')
    .then(
      userSnapshot => dispatch(fetchUserPreferencesSuccess(userSnapshot.val())),
      err => {
        // messageWarning('something went wrong');
        throw new Error(err);
      },
    );
}

export function fetchUser() {
  function saveUser({ uid, email, displayName }) {
    dispatch(fetchUserSuccess({ uid, email, displayName }));
    checkIfUserExist(uid).then(exist => {
      dispatch(setFirstVisitSuccess(!exist));
      if (exist) {
        getPermissions(uid);
        fetchUserPreferences(uid);
      }
      if (!exist) {
        // sendEmail(email);
        saveUserOnCloud({
          uid,
          email,
          displayName,
          firstLogin: new Date().toString(),
        });
      }
    });
  }

  dispatch(fetchUserAttempt());
  auth.onAuthStateChanged().then(
    // eslint-disable-next-line
    data => {
      data ? saveUser(data) : dispatch(fetchUserSuccess(null));
    },
    err => {
      dispatch(fetchUserFailure(err));
      // messageWarning('something went wrong');
      throw new Error(err);
    },
  );
}

// userAuth
export function updatePassword(newPassword) {
  dispatch(updatePasswordAttempt());
  auth.updatePassword(newPassword).then(
    () => dispatch(updatePasswordSuccess()),
    err => {
      dispatch(updatePasswordFailure(err));
      // messageWarning('something went wrong');
      throw new Error(err);
    },
  );
}

export function loginWithEmail({ email, password }) {
  dispatch(loginUserAttempt());
  auth.loginWithEmail(email, password).then(
    data => {
      const { email, displayName, uid } = data;
      dispatch(loginUserSuccess({ email, displayName, uid }));
      fetchUser();
      getPermissions(uid);
      browserHistory.push('/');
    },
    err => {
      dispatch(loginUserFailure(err));
      // messageWarning('something went wrong');
      throw new Error(err);
    },
  );
}

export function registerWithEmail({ email, password }) {
  dispatch(registerAttempt());
  auth.registerWithEmail(email, password).then(
    ({ displayName, uid }) => {
      dispatch(registerSuccess({ email, displayName, uid }));
      fetchUser();
      browserHistory.push('/registration-success');
    },
    err => {
      dispatch(registerFailure(err));
      // messageWarning('something went wrong');
      throw new Error(err);
    },
  );
}

export function loginWithProvider(provider) {
  dispatch(loginUserAttempt());
  auth.loginWithProvider(provider).then(
    data => {
      const {
        user: { email, displayName, uid },
      } = data;
      dispatch(loginUserSuccess({ email, displayName, uid }));
      fetchUser();
      getPermissions(uid);
      browserHistory.push('/');
    },
    err => {
      dispatch(loginUserFailure(err));
      // messageWarning('something went wrong');
      console.log('loginWithProvider error: ', err);
    },
  );
}

export function saveUserOnCloud(userData) {
  // const userKey = dbRef('users').push().key;
  const user = {};

  user[`/users/${userData.uid}`] = userData;

  dbRef()
    .update(user)
    .then(
      () => console.log('saveUserOnCloud success'),
      err => {
        throw new Error(err);
      },
    );
}

export function checkIfUserExist(uid) {
  return dbRef(`users/${uid}`)
    .once('value')
    .then(
      userSnapshot => userSnapshot.val(),
      err => {
        // messageWarning('something went wrong');
        throw new Error(err);
      },
    );
}

export function getPermissions(uid) {
  return dbRef(`permissions/${uid}`)
    .once('value')
    .then(
      userSnapshot => dispatch(setPermissionsSuccess(userSnapshot.val())),
      err => {
        // messageWarning('something went wrong');
        throw new Error(err);
      },
    );
}

export function logOut() {
  dispatch(logoutUserAttempt());
  auth.logoutUser().then(
    () => {
      dispatch(logoutUserSuccess());
    },
    err => {
      dispatch(logoutUserFailure(err));
      // messageWarning('something went wrong');
      throw new Error(err);
    },
  );
}

// export function createNewAd(values, uid) {
//   const images = values.images;
//   delete values.images; //eslint-disable-line
//   const newAdKey = dbRef('ads').push().key;
//   const newAd = {};
//   newAd[`/ads/${newAdKey}`] = { ...values };
//   newAd[`/user_ads/${uid}/${newAdKey}`] = { ...values };
//   dbRef()
//     .update(newAd)
//     .then(
//       () => {
//         const handleImageUpload = (image, resolve, reject) => {
//           const newImageKey = dbRef(`ads/${newAdKey}/images`).push().key;
//           storRef(`/images/${newImageKey}`)
//             .put(image)
//             .then(
//               snapshot => {
//                 const pathAds = `/ads/${newAdKey}/images/${newImageKey}`;
//                 const pathUserAds = `/user_ads/${uid}/${newAdKey}/images/${newImageKey}`;
//                 const imgUrl = {};
//                 imgUrl[pathAds] = snapshot.downloadURL;
//                 imgUrl[pathUserAds] = snapshot.downloadURL;
//                 dbRef()
//                   .update(imgUrl)
//                   .then(
//                     () => resolve(),
//                     error => reject(error),
//                   );
//               },
//               error => reject(error),
//             );
//         };
//
//         const promiseList = Object.keys(images).map(key => {
//           const image = images[key];
//           const promise = new Promise((resolve, reject) => {
//             handleImageUpload(image, resolve, reject);
//           });
//           return promise;
//         });
//
//         Promise.all(promiseList).then(
//           () => store.dispatch(createUserAdSuccess()),
//           error => {
//             store.dispatch(createUserAdFailure());
//             throw new Error(error);
//           },
//         );
//       },
//       error => {
//         store.dispatch(createUserAdFailure());
//         throw new Error(error);
//       },
//     );
// }

// const imageUpload = (image, resolve, reject, saveKey, uid) => {
//   const imageKey = dbRef(`resolutions/${saveKey}/images`).push().key;
//   storageRef(`/images/${imageKey}`)
//     .put(image)
//     .then(
//       snapshot => {
//         const imgUrl = {};
//         imgUrl[`/resolutions/${saveKey}/images/${imageKey}`] =
//           snapshot.downloadURL;
//         dbRef()
//           .update(imgUrl)
//           .then(() => resolve(), err => reject(err));
//       },
//       err => reject(err),
//     );
// };
