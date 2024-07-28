import React from 'react';
import { connect } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { ContainerBase } from '../../foundation/index';
import Styled from './AdMap.styles';
import { MAP_API_KEY } from '../../../../config';

const AdMap = ({ item, google }) => {
  if (!item) return null;

  return (
    <ContainerBase>
      <h2>Location</h2>
      <Styled.Text>Some address...</Styled.Text>
      <Styled.MapContent>
        <Map google={google} zoom={14}>
          <Marker
            name={item.name}
            position={{ lat: item.latitude, lng: item.longtitude }}
          />
        </Map>
      </Styled.MapContent>
    </ContainerBase>
  );
};

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY,
})(connect()(AdMap));
