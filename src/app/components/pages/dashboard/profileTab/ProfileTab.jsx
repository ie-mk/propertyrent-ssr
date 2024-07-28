import React from 'react';
import { ContainerBase, Grid } from '../../../foundation';
import ProfilePicture from '../../../profile/profilePicUploader/ProfilePicUploader';
import Profile from '../../../profile/ProfileForm';
import { IS_SERVER } from '../../../../constants';
import ErrorBoundary from '../../../ErrorBoundary';
import styled from 'styled-components';

const RoundedBox = props => (
  <ContainerBase
    {...props}
    border="primary"
    padding="lg"
    margin="lg"
    borderRadius="sm"
    backgroundColor="DashboardBackGroundColor"
    boxShadow="DashboardBoxShadow"
  />
);

const ProfileTab = () => {
  if (IS_SERVER) return null;
  return (
    <Grid
      columns="2fr 1fr"
      mediaColConfig={{
        belowTablet: '1fr',
      }}
    >
      <div>
        <RoundedBox>
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        </RoundedBox>
      </div>
      <div>
        <RoundedBox>
          <ErrorBoundary>
            <ProfilePicture />
          </ErrorBoundary>
        </RoundedBox>
      </div>
    </Grid>
  );
};

export default ProfileTab;
