import React from 'react';
import { ContainerBase, Grid } from '../../foundation';
import Styled from './AdContacthost.styles';
import { paddingMap } from '../../../constants/styles';

const AdContacthost = ({ item }) => {
  if (!item) return null;

  return (
    <ContainerBase borderBottom="primary">
      <Grid
        columns="2fr 1fr"
        gridGap={paddingMap.sm}
        mediaColConfig={{ belowTablet: '1fr' }}
      >
        <ContainerBase margin="xxxl">
          <Grid
            columns="1fr 1fr"
            gridGap={paddingMap.sm}
            mediaColConfig={{ belowTablet: '1fr' }}
          >
            <div>
              <Styled.Text>
                Languages: {item && item.languages && item.languages.toString()}
              </Styled.Text>
              <Styled.Text>
                Response rate: {item && item.response_rate} %
              </Styled.Text>
              {item.response_time ? (
                <Styled.Text>
                  Response time: with in
                  {item.response_time === 1 ? (
                    <span> {item.response_time} hour</span>
                  ) : (
                    <span> {item.response_time} hours</span>
                  )}
                </Styled.Text>
              ) : null}
            </div>

            <Styled.Button>Contact host</Styled.Button>
          </Grid>
        </ContainerBase>
      </Grid>
    </ContainerBase>
  );
};
export default AdContacthost;
