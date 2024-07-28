import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Styled from './Map.styles';
import styles from '../../mockData/GoogleMapStyles.json';
import { mapActions } from '../../store/actions';
import { MAP_API_KEY } from '../../../config';
import GoogleMap from 'google-map-react';
import {
  colors,
  paddingMap,
  fontSizeMap,
  borderRadius,
  borders,
} from '../../constants/styles';

const markerStyle = {
  position: 'absolute',
  width: 60,
  height: 40,
  left: -60 / 2,
  top: -40 / 2,
  border: borders.xs,
  borderRadius: borderRadius.md,
  backgroundColor: colors.modal.backgroundColor,
  textAlign: 'center',
  color: colors.secondary,
  fontSize: fontSizeMap.title3,
  fontWeight: 'bold',
  padding: paddingMap.xxS,
};

const highlightedMarker = {
  position: 'absolute',
  width: 80,
  height: 50,
  left: -60 / 2,
  top: -40 / 2,
  border: borders.sm,
  borderRadius: borderRadius.md,
  backgroundColor: colors.modal.backgroundColor,
  textAlign: 'center',
  color: colors.secondary,
  fontSize: fontSizeMap.title3,
  fontWeight: 'bold',
  padding: paddingMap.xxS,
};

const Place = props => (
  <div style={markerStyle} onClick={props.click}>
    {props.text}
  </div>
);

const HighlightedPlace = props => (
  <div style={highlightedMarker} onClick={props.click}>
    {props.text}
  </div>
);

const MapContainer = ({ dispatch, hoveredListItemId, ads, scrollFromTop }) => {
  if (!ads) return null;
  const items = Object.values(ads);
  if (!items.length) return null;

  const ids = Object.keys(ads);

  const mapClicked = id => {
    dispatch(mapActions.setActiveMapItemId(id));
  };

  let lat = 0;
  let lng = 0;
  let nrOfElementsWithGeo = 0;
  for (var i = 0; i < items.length; i++) {
    const item = items && items[i];
    const latitude = item && item.latitude;
    const longtitude = item && item.longtitude;

    if (latitude && longtitude) {
      lat += latitude;
      lng += longtitude;
      nrOfElementsWithGeo++;
    }
  }

  const avgLlatitude = lat / nrOfElementsWithGeo;
  const avgLongtitude = lng / nrOfElementsWithGeo;

  return (
    <Styled.MapWrapper className={scrollFromTop} scrollFromTop={scrollFromTop}>
      <GoogleMap
        options={{ styles: styles }}
        apiKey={MAP_API_KEY}
        center={[avgLlatitude, avgLongtitude]}
        zoom={14}
      >
        {items.map((item, idx) => {
          if (!item.latitude || !item.longtitude) return null;

          return hoveredListItemId === ids[idx] ? (
            <HighlightedPlace
              key={idx}
              click={() => mapClicked(ids[idx])}
              lat={item.latitude}
              lng={item.longtitude}
              text={`£${item.price_per_night}`}
            />
          ) : (
            <Place
              key={idx}
              click={() => mapClicked(ids[idx])}
              lat={item.latitude}
              lng={item.longtitude}
              text={`£${item.price_per_night}`}
            />
          );
        })}
      </GoogleMap>
    </Styled.MapWrapper>
  );
};
const mapStateToProps = state => ({
  hoveredListItemId: state.map.hoveredListItemId,
  ads: state.ads.data,
  scrollFromTop: state.layout.scrollFromTop,
});
export default connect(mapStateToProps)(MapContainer);
