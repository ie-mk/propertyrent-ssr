import { createSelector } from 'reselect';
import { amenitiesMap, things_to_knowMap } from '../constants';
import moment from 'moment';

export const getUserSelector = state => state.user;

export const getUID = state =>
  state.user &&
  state.user.loginProviderData &&
  state.user.loginProviderData.uid;

export const getCreadedAdIdSelelector = state =>
  state.ads && state.ads.createdAdId;

export const getUserProfileSelector = state => state.user && state.user.profile;

export const getNewAdFormValuesSelector = state => {
  return state.form && state.form.newAdForm && state.form.newAdForm.values;
};

export const getEditableAdId = state => state.ads && state.ads.editableAdId;

export const getActiveAdSelector = createSelector(
  state => state.ads.activeAdId,
  state => state.ads.data,
  (activeAdId, ads) => ads && ads[activeAdId],
);

export const getEditabledAd = createSelector(
  getEditableAdId,
  state => state.ads && state.ads.data,
  (id, ads) => (ads && id && ads[id]) || {},
);

export const getAdAddressData = createSelector(getEditabledAd, ad => {
  return {
    addressLine1: ad.addressLine1 || '',
    addressLine2: ad.addressLine2 || '',
    addressLine3: ad.addressLine3 || '',
    city: ad.city || '',
    zipCode: ad.zipCode || '',
    country: ad.country || '',
  };
});

export const getAdpositionData = createSelector(getEditabledAd, ad => {
  return {
    position: ad.position || null,
  };
});

export const getAdAmenitiesData = createSelector(getEditabledAd, ad => {
  const amenitiesKeys = Object.keys(amenitiesMap) || [];
  return amenitiesKeys.reduce((acc, key) => {
    acc[key] = (ad && ad.amenities && ad.amenities[key]) || false;
    return acc;
  }, {});
});

export const getAdThingsToKnowData = createSelector(getEditabledAd, ad => {
  let thingskeys = Object.keys(things_to_knowMap);

  return thingskeys.reduce((acc, key) => {
    acc[key] = (ad && ad.amenities && ad.amenities[key]) || '';
    return acc;
  }, {});
});

export const getCancellationData = createSelector(getEditabledAd, ad => {
  return {
    cancellationChargeFreePeriod: ad.cancellationChargeFreePeriod || '',
    cancellationCharges: ad.cancellationCharges || '',
  };
});

export const getAdDescriptionData = createSelector(getEditabledAd, ad => {
  return {
    title: ad.title || '',
    type: ad.type || '',
    max_nr_of_guests: ad.max_nr_of_guests || '',
    bedrooms: ad.bedrooms || '',
    bathrooms: ad.bathrooms || '',
    nr_of_rooms: ad.nr_of_rooms || '',
    price_per_night: ad.price_per_night || '',
    currency: ad.currency || '',
    description_location: ad.description_location || '',
    description_full: ad.description_full || '',
  };
});

export const getDateRangeSelector = state =>
  state.form &&
  state.form.filter &&
  state.form.filter.values &&
  state.form.filter.values.dateRange;

export const getNumberOfPeople = state =>
  state.form &&
  state.form.filter &&
  state.form.filter.values &&
  state.form.filter.values.numberOfPeople;

export const getSelectedDateSelector = createSelector(
  getDateRangeSelector,
  dateRange => {
    let startDate = dateRange && dateRange.startDate;
    startDate = startDate && moment(startDate);

    let endDate = dateRange && dateRange.endDate;
    endDate = endDate && moment(endDate);

    return {
      startDate,
      endDate,
    };
  },
);
