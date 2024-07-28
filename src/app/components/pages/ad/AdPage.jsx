import React, { useEffect } from 'react';
import PicturesViewer from '../../adContent/picturesViewer/PicturesViewer';
import PageContent from '../../foundation/PageContent';
import AdPricing from '../../adContent/adPricing/AdPricing';
import AdDesription from '../../adContent/adDescription/AdDescription';
import { Grid } from '../../foundation';
import stayLength from '../../../mockData/searchQueryParams.json';
import AdAmenities from '../../adContent/adAmenities/AdAmenities';
import AdMap from '../../adContent/adMap/AdMap';
import AdAvailability from '../../adContent/adAvailability/AdAvailability';
import AdContacthost from '../../adContent/adContacthost/AdContacthost';
import AdThingsToKnow from '../../adContent/adThingsToKnow/AdThingsToKnow';
import AdMorePlaces from '../../adContent/adMorePlaces/AdMorePlaces';
import { connect } from 'react-redux';
import BackButton from '../../button/BackButton/BackButton';
import ContainerBase from '../../foundation/ContainerBase';
import { adActions } from '../../../store/actions';
import { getActiveAdSelector } from '../../../store/selectors';

const AdPage = ({ activeAd, activeAdId, dispatch, ads }) => {
  var numberOfDays = stayLength.stayLengthIndays;

  useEffect(() => {
    dispatch(adActions.fetchAd.request(activeAdId));
  }, [activeAdId]);

  if (!activeAd) return null;

  return (
    <PageContent>
      <ContainerBase overflow="hidden">
        <BackButton />

        <PicturesViewer images={activeAd && activeAd.images} />
        <Grid
          columns="2fr 1fr"
          mediaColConfig={{
            belowTablet: '1fr',
          }}
        >
          <AdDesription item={activeAd} />
          <AdPricing item={activeAd} numberOfDays={numberOfDays} />
        </Grid>
        <Grid
          columns="2fr 1fr"
          mediaColConfig={{
            belowTablet: '1fr',
          }}
        >
          <AdAmenities data={activeAd && activeAd.amenities} />
        </Grid>

        <AdMap item={activeAd} />

        <AdAvailability item={activeAd} />
        <AdContacthost item={activeAd} />
        <AdThingsToKnow item={activeAd} />
        <AdMorePlaces data={ads} />
      </ContainerBase>
    </PageContent>
  );
};

const mapStateToProps = state => ({
  activeAd: getActiveAdSelector(state),
  activeAdId: state.ads && state.ads.activeAdId,
  ads: state.ads.data,
});

export default connect(mapStateToProps)(AdPage);
