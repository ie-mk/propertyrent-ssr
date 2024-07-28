import React, { useState, useEffect } from 'react';
import Styled from './Price.styles';
import { Field, reduxForm } from 'redux-form';

const Price = props => {
  const { handleSubmit } = props;
  return (
    <>
      <Styled.FormWrapper>
        <form onSubmit={handleSubmit}>
          <Styled.PriceRange>
            <Styled.PriceContainer>
              <Styled.Label>min price</Styled.Label>
              <Styled.InputStyles>
                <Field
                  className="search-input"
                  name="minPrice"
                  component="input"
                  type="number"
                />
              </Styled.InputStyles>
            </Styled.PriceContainer>
            <i className="fa fa-minus" aria-hidden="true" />
            <Styled.PriceContainer>
              <Styled.Label>max price</Styled.Label>
              <Styled.InputStyles>
                <Field
                  className="search-input"
                  name="maxPrice"
                  component="input"
                  type="number"
                />
              </Styled.InputStyles>
            </Styled.PriceContainer>
          </Styled.PriceRange>
        </form>
      </Styled.FormWrapper>
    </>
  );
};

export default reduxForm({
  form: 'filter', // a unique identifier for this form
  destroyOnUnmount: false,
})(Price);
