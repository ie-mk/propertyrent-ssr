import React from 'react';
import { ContainerBase, Grid } from '../../foundation/index';
import { paddingMap } from '../../../constants/styles';
import { amenitiesMap } from '../../../constants';
import PageContent from '../../foundation/PageContent';
import { Field } from 'redux-form';
import Styled from './newAdAmenities.styles';

const ItemSection = props => (
  <ContainerBase
    paddingTop="xxxS"
    paddingBottom="sm"
    display="flex"
    {...props}
  />
);

const NewAdAmenities = () => {
  const amenitieskeys = Object.keys(amenitiesMap);

  return (
    <PageContent>
      <Styled.HeaderText>Amenities</Styled.HeaderText>
      <Grid
        columns="1fr 1fr"
        gridGap={paddingMap.sm}
        mediaColConfig={{ belowTablet: '1fr' }}
      >
        {amenitieskeys.map(key => {
          return (
            <ItemSection key={key}>
              <Field
                name={`amenities_${key}`}
                component="input"
                type="checkbox"
              />
              <Styled.Icon>
                <i className={amenitiesMap[key].icon} aria-hidden="true" />
              </Styled.Icon>
              {amenitiesMap[key].name}
            </ItemSection>
          );
        })}
      </Grid>
    </PageContent>
  );
};

export default NewAdAmenities;
