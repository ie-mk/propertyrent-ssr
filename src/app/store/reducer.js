import { handleActions } from 'redux-actions';
import { adActions, layoutActions, mapActions, userActions } from './actions';

export const adsReducer = handleActions(
  {
    [adActions.createNewAd.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [adActions.createNewAd.success.type]: (state, { payload }) => ({
      ...state,
      loading: false,
      createdAdId: payload,
    }),
    [adActions.createNewAd.failure.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),

    //==================================================================//

    [adActions.fetchAds.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [adActions.fetchAds.success.type]: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload,
    }),
    [adActions.fetchAds.failure.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),

    //==================================================================//

    [adActions.fetchAd.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [adActions.fetchAd.success.type]: (state, { payload }) => ({
      ...state,
      loading: false,
      data: { ...state.data, [payload.adId]: payload.data },
    }),
    [adActions.fetchAd.failure.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),

    //==================================================================//

    [adActions.updateAd.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [adActions.updateAd.success.type]: state => ({
      ...state,
      loading: false,
    }),
    [adActions.updateAd.failure.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),

    //==================================================================//

    [adActions.updateAdImages.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [adActions.updateAdImages.success.type]: state => ({
      ...state,
      loading: false,
    }),
    [adActions.updateAdImages.failure.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),

    //==================================================================//

    [adActions.deleteAdImage.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [adActions.deleteAdImage.success.type]: state => ({
      ...state,
      loading: false,
    }),
    [adActions.deleteAdImage.failure.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),

    //==================================================================//

    [adActions.setEditableAdId]: (state, action) => ({
      ...state,
      editableAdId: action.payload,
    }),

    //==================================================================//

    [adActions.setActiveAdId]: (state, action) => ({
      ...state,
      activeAdId: action.payload,
    }),

    //==================================================================//

    [adActions.resetAds]: () => ({
      data: null,
      loading: null,
      error: null,
    }),
  },
  {
    data: null,
    loading: null,
    error: null,
    editableAdId: '',
    activeAdId: '',
  },
);

export const mapReducer = handleActions(
  {
    [mapActions.setActiveMapItemId]: (state, action) => ({
      ...state,
      activeMapItemId: action.payload,
    }),
    [mapActions.setHoveredListItemId]: (state, action) => ({
      ...state,
      hoveredListItemId: action.payload,
    }),
  },
  { activeMapItemId: null },
  { hoveredListItemId: null },
);

export const userReducer = handleActions(
  {
    //==================================================================//

    [adActions.fetchUserAds.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [adActions.fetchUserAds.success.type]: (state, action) => ({
      ...state,
      loading: false,
      ads: action.payload,
    }),
    [adActions.fetchUserAds.failure.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),

    //==================================================================//

    [userActions.saveUserInfoFromLoginProvider]: (state, action) => ({
      ...state,
      loginProviderData: action.payload,
    }),
    [userActions.setLanguage]: (state, action) => ({
      ...state,
      userLanguage: action.payload,
    }),

    /*===============================================================*/
    [userActions.fetchUserPermissions.success.type]: state => ({
      ...state,
      loading: true,
    }),
    [userActions.fetchUserPermissions.success.type]: (state, action) => ({
      ...state,
      loading: false,
      permissions: action.payload,
    }),
    [userActions.fetchUserPermissions.failure.typ]: (state, action) => ({
      ...state,
      loading: false,
      fetchPermissionsError: action.payload,
    }),

    /*===============================================================*/

    [userActions.fetchUserProfile.request.type]: state => ({
      ...state,
      loading: true,
    }),
    [userActions.fetchUserProfile.success.type]: (state, action) => ({
      ...state,
      loading: false,
      profile: action.payload,
    }),
    [userActions.fetchUserProfile.failure.type]: (state, action) => ({
      ...state,
      loading: false,
      fetchProfileError: action.payload,
    }),

    /*===============================================================*/

    [userActions.updateUserProfile.request]: state => ({
      ...state,
      loading: true,
    }),
    [userActions.updateUserProfile.success]: (state, action) => ({
      ...state,
      loading: false,
      profile: action.payload,
    }),
    [userActions.updateUserProfile.failure]: (state, action) => ({
      ...state,
      loading: false,
      saveProfileError: action.payload,
    }),

    /*===============================================================*/

    [userActions.updateUserProfilePicture.request]: state => ({
      ...state,
      loadingPicture: true,
    }),
    [userActions.updateUserProfilePicture.success]: state => ({
      ...state,
      loadingPicture: false,
    }),
    [userActions.updateUserProfilePicture.failure]: (state, action) => ({
      ...state,
      loadingPicture: false,
      saveProfilePictureError: action.payload,
    }),

    /*===============================================================*/

    [userActions.adToFavourites]: (state, action) => ({
      ...state,
      favourites: { ...state.favourites, ...action.payload },
    }),

    /*===============================================================*/

    [userActions.resetUser]: state => ({
      ...state,
      loginProviderData: {},
      profile: {},
      permissions: {},
    }),
    [userActions.setIsFirstLogin]: (state, action) => ({
      ...state,
      isFirstLogin: action.payload,
    }),
  },
  {
    loginProviderData: {},
    profile: {},
    permissions: {},
    loading: false,
    loadingPicture: false,
    error: null,
    isFirstLogin: null,
    favourites: {},
    ads: null,
  },
);

export const layoutReducer = handleActions(
  {
    [layoutActions.setScrollFromTop]: (state, action) => ({
      ...state,
      scrollFromTop: action.payload,
    }),
  },
  {
    scrollFromTop: 0,
  },
);
