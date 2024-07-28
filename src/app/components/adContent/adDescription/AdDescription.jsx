import React from 'react';
import { ContainerBase } from '../../foundation/index';
import Styled from './AdDescription.styles';
import { connect } from 'react-redux';

const DescriptionSection = props => (
  <ContainerBase paddingTop="xl" paddingBottom="sm" display="flex" {...props} />
);

const AdDesription = ({ item, filterValues }) => {
  if (!item) return null;

  let numberOfPeople =
    filterValues && filterValues.values && filterValues.values.numberOfPeople;
  return (
    <ContainerBase>
      <div>
        {numberOfPeople} guests • {item.bedrooms} bedrooms • 3 beds •{' '}
        {item.bathrooms} bathroom{' '}
      </div>
      <DescriptionSection>
        <Styled.Icon>
          <i className="fa fa-star-o fa-2x" aria-hidden="true" />
        </Styled.Icon>
        <div>
          <Styled.HeadText>Location</Styled.HeadText>
          <div>{item.description_property_type_explanation}</div>
        </div>
      </DescriptionSection>

      <DescriptionSection paddingTop="sm">
        <Styled.Icon>
          <i className="fa fa-map-marker fa-3x" aria-hidden="true" />
        </Styled.Icon>
        <div>
          <Styled.HeadText>{item.description_location}</Styled.HeadText>
          <div>{item.location_rating} </div>
        </div>
      </DescriptionSection>

      <p>
        {item.description_full}
        <a href="">
          <strong>readmore</strong>
        </a>
        .
      </p>
    </ContainerBase>
  );
};

const mapStateToProps = state => ({
  filterValues: state.form && state.form.filter,
});

export default connect(mapStateToProps)(AdDesription);
