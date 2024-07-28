import React, { useState } from 'react';
import Styled from './Map.styles';
import { change } from 'redux-form';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MAP_API_KEY } from '../../../../../config';
import Geocode from 'react-geocode';
import { adActions } from '../../../../store/actions';
import ErrorBoundary from '../../../ErrorBoundary';
import { useTranslation } from 'react-i18next';

const MapWithAMarker = withScriptjs(
  withGoogleMap(({ dispatch, addressData, positionData, adId }) => {
    const [editMap, setEditMap] = useState(false);
    const [tempPosition, setTempPosition] = useState(
      (positionData && positionData.tempPosition) || null,
    );

    let position = null;
    if (positionData) {
      position = positionData.position;
    }

    const handleDragging = args => {
      const latLng = {
        lat: args.latLng.lat(),
        lng: args.latLng.lng(),
      };
      setTempPosition(latLng);
    };

    Geocode.setApiKey(MAP_API_KEY);
    Geocode.setLanguage('en');
    const { t } = useTranslation();

    const handleSave = () => {
      if (!tempPosition) return;

      setEditMap(false);
      dispatch(
        adActions.updateAd.request({
          adId,
          data: {
            latitude: tempPosition.lat,
            longtitude: tempPosition.lng,
          },
        }),
      );
    };

    const geopoint = position && position.geopoint;
    const lat = geopoint && geopoint.latitude;
    const lng = geopoint && geopoint.longitude;

    const positionVal =
      lat && lng
        ? {
            lat: (tempPosition && tempPosition.lat) || lat,
            lng: (tempPosition && tempPosition.lng) || lng,
          }
        : undefined;

    if (!positionVal) return null;

    return (
      <ErrorBoundary>
        <Styled.Wrapper data-test="test-map">
          <GoogleMap defaultZoom={15} defaultCenter={positionVal}>
            {positionVal && (
              <Marker
                draggable={true}
                position={positionVal}
                onDragEnd={handleDragging}
              />
            )}
          </GoogleMap>
          {editMap && (
            <Styled.Message>
              Move the marker to adjust location and click save
            </Styled.Message>
          )}
          <Styled.ButtonContainer>
            {!editMap && (
              <Styled.CustomButton
                adjust={true}
                onClick={() => setEditMap(true)}
              >
                {t('Adjust Location')}
              </Styled.CustomButton>
            )}
            {editMap && tempPosition && (
              <Styled.CustomButton type="primarySubtle" onClick={handleSave}>
                {t('Save Address')}
              </Styled.CustomButton>
            )}
          </Styled.ButtonContainer>
        </Styled.Wrapper>
      </ErrorBoundary>
    );
  }),
);

export default ({ positionData, addressData, dispatch, adId }) => (
  <MapWithAMarker
    positionData={positionData}
    addressData={addressData}
    dispatch={dispatch}
    adId={adId}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: '377px', padding: '20px' }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
