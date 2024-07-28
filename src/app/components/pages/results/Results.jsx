import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ContainerBase, Grid } from '../../foundation';
import List from '../../searchList/List';
import Filters from '../../filter/Filter';
import Map from '../../map/Map';
import { adActions } from '../../../store/actions';
import { colors } from '../../../constants/styles';

const Results = ({ dispatch, ads }) => {
  useEffect(() => {
    dispatch(adActions.fetchAds.request());
  }, []);

  return (
    <ContainerBase position="relative">
      <div>
        <Grid
          columns="minmax(auto, 600px) minmax(50%, auto)"
          mediaColConfig={{
            belowTablet: '1fr',
          }}
        >
          <ContainerBase border="primary">
            <List ads={ads} />
          </ContainerBase>
          <ContainerBase border="primary" position="relative">
            <Map />
          </ContainerBase>
        </Grid>
      </div>
    </ContainerBase>
  );
};

const mapStateToProps = state => ({
  ads: state.ads.data,
});

export default connect(mapStateToProps)(Results);
