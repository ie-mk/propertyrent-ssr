import React, { useState } from 'react';
import Styled from './Map.styles';
import { change } from 'redux-form';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { MAP_API_KEY } from '../../../../config';
import Geocode from 'react-geocode';

const MapWithAMarker = withScriptjs(
  withGoogleMap(({ dispatch, formValues }) => {
    const [editMap, setEditMap] = useState(false);

    let location = null;
    let adjustedPosition = null;
    let tempPosition = null;
    if (formValues) {
      location = formValues.location;
      adjustedPosition = formValues.adjustedPosition;
      tempPosition = formValues.tempPosition;
    }

    const handleDragging = args => {
      const latLng = {
        lat: args.latLng.lat(),
        lng: args.latLng.lng(),
      };
      dispatch(change('newAdForm', 'tempPosition', latLng));
    };

    Geocode.setApiKey(MAP_API_KEY);
    Geocode.setLanguage('en');

    const handleSave = () => {
      setEditMap(false);
      dispatch(change('newAdForm', 'adjustedPosition', tempPosition));
    };

    const locationVal = adjustedPosition || tempPosition || location;

    if (!locationVal) return null;

    return (
      <div>
        <GoogleMap defaultZoom={15} defaultCenter={locationVal}>
          {locationVal && (
            <Marker
              draggable={editMap}
              position={locationVal}
              onDragEnd={handleDragging}
            />
          )}
        </GoogleMap>
        <Styled.ButtonContainer>
          {!editMap && (
            <Styled.CustomButton onClick={() => setEditMap(true)}>
              Adjust Location
            </Styled.CustomButton>
          )}
          {editMap && (
            <Styled.CustomButton onClick={handleSave}>
              Save Address
            </Styled.CustomButton>
          )}
        </Styled.ButtonContainer>
      </div>
    );
  }),
);

export default ({ formValues, dispatch }) => (
  <MapWithAMarker
    formValues={formValues}
    dispatch={dispatch}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: '350px', padding: '20px' }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
