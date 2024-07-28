import React, { useState } from 'react';
import { ContainerBase, Grid } from '../../foundation/index';
import { paddingMap } from '../../../constants/styles';
import { things_to_knowMap } from '../../../constants';
import Styled from './AdThingsToKnow.styles';

const ItemSection = props => (
  <ContainerBase
    paddingTop="xxxS"
    paddingBottom="sm"
    display="flex"
    {...props}
  />
);

const AdThingsToKnow = ({ item }) => {
  const [showAll, setShowAll] = useState(false);
  const [showAllPolicies, setShowAllPolicies] = useState(false);

  if (!item) return null;

  let things_to_know = item.things_to_know;

  if (!things_to_know) return null;

  let thingskeys = Object.keys(things_to_know);
  let values = Object.values(things_to_know);

  return (
    <ContainerBase marginTop="xxl" borderBottom="primary">
      <Styled.HeaderText>Things To Know</Styled.HeaderText>
      <Grid
        columns="1fr 1fr"
        gridGap={paddingMap.sm}
        mediaColConfig={{ belowTablet: '1fr' }}
      >
        <div>
          <Styled.SubHeaderText>House rules</Styled.SubHeaderText>
          {thingskeys.map((key, idx) => {
            return showAll || (!showAll && idx < 3) ? (
              <ItemSection key={key}>
                <Styled.Icon>
                  <i
                    className={things_to_knowMap[key].icon}
                    aria-hidden="true"
                  />
                </Styled.Icon>
                {things_to_knowMap[key].name} {values[idx]}
              </ItemSection>
            ) : null;
          })}

          {thingskeys.length > 2 && !showAll ? (
            <Styled.Button
              marginTop="md"
              marginBottom="xl"
              textDecor={true}
              onClick={() => setShowAll(!showAll)}
            >
              Show all >
            </Styled.Button>
          ) : showAll ? (
            <Styled.Button
              marginBottom="xl"
              marginTop="md"
              textDecor={true}
              onClick={() => setShowAll(!showAll)}
            >
              Show less >
            </Styled.Button>
          ) : null}
        </div>

        <div>
          <Styled.SubHeaderText>Cancellation Policy</Styled.SubHeaderText>
          <div>{item.cancellation_charge_free}</div>
          <div>{item.cancellation_chargeable}</div>
          {!showAllPolicies ? (
            <Styled.Button
              marginTop="md"
              textDecor={true}
              onClick={() => setShowAllPolicies(!showAllPolicies)}
            >
              More details >
            </Styled.Button>
          ) : (
            <Styled.Button
              marginTop="md"
              onClick={() => setShowAllPolicies(!showAllPolicies)}
            >
              Close
            </Styled.Button>
          )}
        </div>
      </Grid>
      <ContainerBase
        display="flex"
        flexDirection="row"
        marginTop="xl"
        marginBottom="xxl"
      >
        <i className="fa fa-flag" aria-hidden="true" />
        <Styled.Button marginLeft="sm" textDecor={true}>
          {' '}
          Report this listing
        </Styled.Button>
      </ContainerBase>
    </ContainerBase>
  );
};

export default AdThingsToKnow;
