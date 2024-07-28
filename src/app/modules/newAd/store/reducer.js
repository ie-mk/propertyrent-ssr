import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import { Types } from './actions';

export const INITIAL_STATE = Immutable({
  ad: null,
  ads: null,
  error: null,
  isOwner: null,
});

const fetchAdSuccess = (state, { ad }) =>
  state.merge({
    ad,
  });

const fetchAdFailure = (state, { error }) =>
  state.merge({
    error,
  });

const fetchUserAdsSuccess = (state, { ads }) =>
  state.merge({
    ads,
  });

const fetchUserAdsFailure = (state, { error }) =>
  state.merge({
    error,
  });

const createUserAdSuccess = state => state;

const createUserAdFailure = (state, { error }) =>
  state.merge({
    error,
  });

const updateUserAdSuccess = (state, { ads }) =>
  state.merge({
    ads,
  });

const updateUserAdFailure = (state, { error }) =>
  state.merge({
    error,
  });

const deleteUserAdSuccess = (state, { ads }) =>
  state.merge({
    ads,
  });

const deleteUserAdFailure = (state, { error }) =>
  state.merge({
    error,
  });

const checkIfUserIsOwnerSuccess = (state, { isOwner }) =>
  state.merge({
    isOwner,
  });

const checkIfUserIsOwnerFailure = (state, { error }) =>
  state.merge({
    error,
  });

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_AD_SUCCESS]: fetchAdSuccess,
  [Types.FETCH_AD_FAILURE]: fetchAdFailure,

  [Types.FETCH_USER_ADS_SUCCESS]: fetchUserAdsSuccess,
  [Types.FETCH_USER_ADS_FAILURE]: fetchUserAdsFailure,

  [Types.CREATE_USER_AD_SUCCESS]: createUserAdSuccess,
  [Types.CREATE_USER_AD_FAILURE]: createUserAdFailure,

  [Types.UPDATE_USER_AD_SUCCESS]: updateUserAdSuccess,
  [Types.UPDATE_USER_AD_FAILURE]: updateUserAdFailure,

  [Types.DELETE_USER_AD_SUCCESS]: deleteUserAdSuccess,
  [Types.DELETE_USER_AD_FAILURE]: deleteUserAdFailure,

  [Types.CHECK_IF_USER_IS_OWNER_SUCCESS]: checkIfUserIsOwnerSuccess,
  [Types.CHECK_IF_USER_IS_OWNER_FAILURE]: checkIfUserIsOwnerFailure,
});
