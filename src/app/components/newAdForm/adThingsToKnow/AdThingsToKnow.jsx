import React, { useState } from 'react';
import { ContainerBase, Grid } from '../../foundation/index';
import { paddingMap } from '../../../constants/styles';
import { things_to_knowMap } from '../../../constants';
import Styled from './AdThingsToKnow.styles';
import { Field } from 'redux-form';

const ItemSection = props => (
  <ContainerBase
    paddingTop="xxxS"
    paddingBottom="sm"
    display="flex"
    {...props}
  />
);

const AdThingsToKnow = () => {
  const [showAll, setShowAll] = useState(false);
  const [showAllPolicies, setShowAllPolicies] = useState(false);

  let thingskeys = Object.keys(things_to_knowMap);

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
            return idx < 2 ? (
              <ItemSection key={key}>
                <Styled.Icon>
                  <i
                    className={things_to_knowMap[key].icon}
                    aria-hidden="true"
                  />
                </Styled.Icon>
                {things_to_knowMap[key].name}
                <Field name={`things_${key}`} component="input" type="input" />
              </ItemSection>
            ) : (
              <ItemSection key={key}>
                <Styled.Icon>
                  <i
                    className={things_to_knowMap[key].icon}
                    aria-hidden="true"
                  />
                </Styled.Icon>
                {things_to_knowMap[key].name}
                <Field
                  name={`things_${key}`}
                  component="input"
                  type="checkbox"
                />
              </ItemSection>
            );
          })}
        </div>

        <div>
          <Styled.SubHeaderText>Cancellation Policy</Styled.SubHeaderText>
          <Styled.CancelationWrapper>
            <Styled.Label>CancellationChargeFree</Styled.Label>
            <Field
              className="cancellation-input"
              name="ChargesFree"
              component="textarea"
              type="textarea"
            />
          </Styled.CancelationWrapper>
          <Styled.CancelationWrapper>
            <Styled.Label>CancellationChargeable</Styled.Label>
            <Field
              className="cancellation-input"
              name="Charges"
              component="textarea"
              type="textarea"
            />
          </Styled.CancelationWrapper>
        </div>
      </Grid>
    </ContainerBase>
  );
};

export default AdThingsToKnow;
