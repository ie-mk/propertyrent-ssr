import React, { useState } from 'react';
import { ContainerBase, Grid } from '../../foundation/index';
import { paddingMap } from '../../../constants/styles';
import { amenitiesMap } from '../../../constants';

import Styled from './AdAmenities.styles';

const ItemSection = props => (
  <ContainerBase
    paddingTop="xxxS"
    paddingBottom="sm"
    display="flex"
    {...props}
  />
);

const AdAmenities = ({ data }) => {
  const [showAll, setShowAll] = useState(false);
  if (!data) return null;

  const amenitieskeys = Object.keys(data);

  return (
    <ContainerBase>
      <Styled.HeaderText>Amenities</Styled.HeaderText>
      <Grid
        columns="1fr 1fr"
        gridGap={paddingMap.sm}
        mediaColConfig={{ belowTablet: '1fr' }}
      >
        {amenitieskeys.map((key, idx) => {
          // console.log('-----amenitiesMap[key]: ', amenitiesMap[key]);
          // console.log('-----amenitiesMap: ', amenitiesMap);
          // console.log('-----amenitieskeys: ', amenitieskeys=  );
          // debugger;
          return showAll || (!showAll && idx < 6) ? (
            amenitiesMap[key] ? (
              <ItemSection key={key}>
                <Styled.Icon>
                  <i className={amenitiesMap[key].icon} aria-hidden="true" />
                </Styled.Icon>
                {amenitiesMap[key].name}
              </ItemSection>
            ) : null
          ) : null;
        })}
      </Grid>
      {amenitieskeys.length > 6 && !showAll ? (
        <Styled.Button
          onClick={() => setShowAll(!showAll)}
        >{`Show all ${amenitieskeys.length} amenities`}</Styled.Button>
      ) : showAll ? (
        <Styled.Button onClick={() => setShowAll(!showAll)}>
          Show less
        </Styled.Button>
      ) : null}
    </ContainerBase>
  );
};

export default AdAmenities;
