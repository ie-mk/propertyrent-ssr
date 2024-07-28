import React from 'react';
import Styled from './DashboardMenu.styles';
import { ContainerBase } from '../../../foundation';

const DashboardMenu = ({ setActiveComponent, active }) => {
  return (
    <ContainerBase minWidth="200px">
      <Styled.MenuItem
        active={active === 'profile'}
        onClick={() => setActiveComponent('profile')}
      >
        <i className="fa fa-user-o" aria-hidden="true" />
        <Styled.Label>MY PROFILE</Styled.Label>
      </Styled.MenuItem>
      <Styled.MenuItem
        active={active === 'notifications'}
        onClick={() => setActiveComponent('notifications')}
      >
        <i className="fa fa-bell-o" aria-hidden="true" />
        <Styled.Label>NOTIFICATIONS</Styled.Label>
      </Styled.MenuItem>
      <Styled.MenuItem
        data-test="results-properties"
        active={active === 'propertiesList'}
        onClick={() => setActiveComponent('propertiesList')}
      >
        <i className="fa fa-list" aria-hidden="true" />
        <Styled.Label>PROPERTIES LIST</Styled.Label>
      </Styled.MenuItem>
      <Styled.MenuItem
        active={active === 'favoriteList'}
        onClick={() => setActiveComponent('favoriteList')}
      >
        <i className="fa fa-heart-o" aria-hidden="true" />
        <Styled.Label>FAVOURITE LIST</Styled.Label>
      </Styled.MenuItem>
    </ContainerBase>
  );
};

export default DashboardMenu;
