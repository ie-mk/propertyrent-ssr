import React, { useEffect } from 'react';
import { ContainerBase } from '../../../foundation';
import List from '../../../searchList/List';
import Styled from './PropertiesListTab.styles';
import { connect } from 'react-redux';
import Button from '@kiwicom/orbit-components/lib/Button';
import { adActions } from '../../../../store/actions';
import { getCreadedAdIdSelelector } from '../../../../store/selectors';
import { useTranslation } from 'react-i18next';

const PropertiesListTab = ({ dispatch, userAds }) => {
  useEffect(() => {
    dispatch(adActions.fetchUserAds.request());
  }, []);

  const { t } = useTranslation();

  return (
    <Styled.Wrapper>
      <ContainerBase padding="lg" borderBottom="primary">
        <Button onClick={() => dispatch(adActions.createNewAd.request())}>
          {t('Create New')}
        </Button>
      </ContainerBase>

      <ContainerBase>
        <List admin={true} ads={userAds} />
      </ContainerBase>
    </Styled.Wrapper>
  );
};

const mapStateToProps = state => ({
  userAds: state.user.ads,
  createdAdId: getCreadedAdIdSelelector(state),
  loading: state.ads.loading,
});

export default connect(mapStateToProps)(PropertiesListTab);
