import React, { useEffect } from 'react';
import { ContainerBase } from '../../../foundation';
import List from '../../../searchList/List';
import { connect } from 'react-redux';
import { adActions } from '../../../../store/actions';

const FavouriteListTab = ({ ads, favourites, dispatch }) => {
  const favouriteKeys = Object.keys(favourites);
  useEffect(() => {
    favouriteKeys.forEach(id => {
      if (!ads[id]) {
        dispatch(adActions.fetchAd.request(id));
      }
    });
  }, []);

  const favouriteAds = Object.keys(favourites).reduce((acc, key) => {
    if (favourites[key]) {
      acc[key] = ads[key];
    }
    return acc;
  }, {});

  return (
    <ContainerBase>
      <List ads={favouriteAds} />
    </ContainerBase>
  );
};

const mapStateToProps = state => ({
  ads: state.ads.data,
  favourites: state.user.favourites,
});

export default connect(mapStateToProps)(FavouriteListTab);
