import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchAdSuccess: ['ad'],
  fetchAdFailure: [],

  fetchUserAdsSuccess: ['ads'],
  fetchUserAdsFailure: [],

  createUserAdSuccess: [],
  createUserAdFailure: [],

  updateUserAdSuccess: [],
  updateUserAdFailure: [],

  deleteUserAdSuccess: [],
  deleteUserAdFailure: [],

  checkIfUserIsOwnerSuccess: ['isOwner'],
  checkIfUserIsOwnerFailure: [],

  clearUserAds: [],
  clearAds: [],
});
