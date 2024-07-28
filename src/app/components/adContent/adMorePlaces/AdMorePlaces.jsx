import React from 'react';
import { ContainerBase } from '../../foundation/index';
import Styled from './AdMorePlaces.styles';
import Router from 'next/router';
import { connect } from 'react-redux';
import { adActions } from '../../../store/actions';

const ItemSection = ({ item, id, dispatch }) => (
  <Styled.ItemContainer
    onClick={() => {
      dispatch(adActions.setActiveAdId(id));

      const url = `/ad?id=${id}`;
      Router.push(url, url, { shallow: true });
    }}
  >
    <div>
      <Styled.Image src={item && item.images && item.images[0]} />
      <Styled.TextRowContainer>
        <Styled.Text fontcolor="gray">
          {item.type} • {item.bedrooms} beds
        </Styled.Text>
        <Styled.Text>
          <i className="fa fa-star" aria-hidden="true" /> {item.rating_average}(
          {item.rating_total_nr})
        </Styled.Text>
      </Styled.TextRowContainer>
      <Styled.Text>{item.title}</Styled.Text>
      <Styled.Text>
        <strong>£{item.price_per_night}</strong> / night{' '}
      </Styled.Text>
    </div>
  </Styled.ItemContainer>
);

let AdMorePlaces = ({ data, dispatch }) => {
  const items = Object.values(data);
  const ids = Object.keys(data);

  return (
    <ContainerBase marginTop="xxl">
      <h2>More places to stay </h2>
      <ContainerBase flexDirection="row" display="flex" overflowX="auto">
        {items.map((item, idx) => {
          let id = ids[idx];
          return (
            <ItemSection key={idx} item={item} id={id} dispatch={dispatch} />
          );
        })}
      </ContainerBase>
    </ContainerBase>
  );
};

export default connect()(AdMorePlaces);
