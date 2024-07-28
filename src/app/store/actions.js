import { createAction } from 'redux-actions';

const createAsyncAction = prefix =>
  ['request', 'success', 'failure'].reduce((acc, str) => {
    const type = `${prefix}/${str.toUpperCase()}`;
    acc[str] = createAction(type);
    acc[str].type = type;
    return acc;
  }, {});

export const adActions = {
  createNewAd: createAsyncAction('create-new-ad'),
  fetchUserAds: createAsyncAction('fetch-user-ads'),
  fetchAds: createAsyncAction('fetch-ads'),
  fetchAd: createAsyncAction('fetch-ad'),
  updateAd: createAsyncAction('update-ad'),
  updateAdImages: createAsyncAction('upload-add-images'),
  deleteAdImage: createAsyncAction('delete-ad-image'),
  resetAds: createAction('RESET_ADS'),
  setEditableAdId: createAction('SET_EDITABLE_AD_ID'),
  setActiveAdId: createAction('SET_ACTIVE_AD_ID'),
};

export const mapActions = {
  setActiveMapItemId: createAction('SET_ACTIVE_MAP_ITEM_ID'),
  setHoveredListItemId: createAction('SET_HOVERED_LIST_ITEM_ID'),
};

export const layoutActions = {
  setScrollFromTop: createAction('SET_SCROLL_FROM_TOP'),
};

export const updatedAdLocationAction = {
  setUpdatedAdLocation: createAction('SET_UPDATED_AD_LOCATION'),
};

export const userActions = {
  saveUserInfoFromLoginProvider: createAction(
    'SAVE_USER_INFO_FROM_LOGIN_PROVIDER',
  ),
  setLanguage: createAction('SET_LANGUAGE'),
  updateUserProfile: createAsyncAction('update-user-profile'),
  updateUserProfilePicture: createAsyncAction('update-user-profile-picture'),
  fetchUserProfile: createAsyncAction('fetch-user-profile'),
  fetchUserPermissions: createAsyncAction('fetch-user-permissions'),

  setIsFirstLogin: createAction('SET_IS_FIRST_LOGIN'),

  resetUser: createAction('RESET_USER'),
  adToFavourites: createAction('AD_TO_FAVOURITES'),
};
