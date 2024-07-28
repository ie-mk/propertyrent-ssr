import React, { useState, useEffect } from 'react';
import { ContainerBase, Grid } from '../../foundation';
import ProfileTab from './profileTab/ProfileTab';
import DashboardMenu from './dashboardMenu/DashboardMenu';
import NotificationsTab from './notificationsTab/NotificationsTab';
import PropertiesListTab from './propertiesListTab/PropertiesListTab';
import FavouriteListTab from './favouriteListTab/favouriteListTab';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { userActions } from '../../../store/actions';
import Styled from './Dashboard.styles';

const Dashboard = ({ dispatch, user, userAds }) => {
  useEffect(() => {
    if (!user.uid) {
      Router.push('/login');
    }
    dispatch(userActions.fetchUserProfile.request(user.uid));
  }, user.uid);

  const { query } = useRouter();

  const makeActive = activeTab => {
    const url = `/dashboard?activeTab=${activeTab}`;
    Router.push(url, url, { shallow: true });
  };

  const activeTab = query && query.activeTab;

  const showProfile = activeTab === 'profile' || !activeTab;
  const showNotifications = activeTab === 'notifications';
  const showPropertyList = activeTab === 'propertiesList';
  const showFavouriteList = activeTab === 'favoriteList';

  if (user)
    return (
      <ContainerBase backgroundColor="DashboardContainersColor">
        <Grid
          columns="0.5fr 2.5fr"
          mediaColConfig={{
            belowTablet: '1fr',
          }}
        >
          <ContainerBase
            borderRight="primary"
            padding="lg"
            height="100vh"
            backgroundColor="DashboardBackGroundColor"
          >
            <DashboardMenu active={activeTab} setActiveComponent={makeActive} />
          </ContainerBase>
          <Styled.Wrapper>
            {showProfile && <ProfileTab />}
            {showNotifications && <NotificationsTab />}
            {showPropertyList && <PropertiesListTab ads={userAds} />}
            {showFavouriteList && <FavouriteListTab />}
          </Styled.Wrapper>
        </Grid>
      </ContainerBase>
    );
};

const mapStateToProps = state => ({
  user: state.user.loginProviderData,
  userAds: state.ads.data,
});

export default connect(mapStateToProps)(Dashboard);
