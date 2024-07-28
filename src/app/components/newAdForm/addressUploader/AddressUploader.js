import React, { useState } from 'react';
import Styled from './AddressUploader.styles';
import { reduxForm, Field, change } from 'redux-form';
import { CountryDropdown } from 'react-country-region-selector';
import { required } from 'redux-form-validators';
import { connect } from 'react-redux';
import Geocode from 'react-geocode';
import { MAP_API_KEY } from '../../../../config';
import { postionAction } from '../../../store/actions';

const AddressUploader = ({ dispatch, formValues }) => {
  const [country, setCountry] = useState('');

  Geocode.setApiKey(MAP_API_KEY);
  Geocode.setLanguage('en');

  const getLocation = () => {
    const address = formValues;
    const adAddress =
      address.addressLine1 +
      ',' +
      address.addressLine2 +
      ',' +
      address.city +
      ',' +
      address.country +
      ',' +
      address.zipCode;

    Geocode.fromAddress(adAddress).then(
      response => {
        const location = response.results[0].geometry.location;
        dispatch(change('newAdForm', 'tempPosition', null));
        dispatch(change('newAdForm', 'adjustedPosition', null));
        dispatch(change('newAdForm', 'location', location));
      },
      error => {
        console.error(error);
      },
    );
  };

  return (
    <div>
      <Styled.Title>Update Address</Styled.Title>
      <Styled.InputRow>
        <Styled.Container>
          <Styled.Label>Address Line1</Styled.Label>
          <Styled.InputStyles>
            <Field
              className="update-input"
              name="addressLine1"
              type="text"
              component="input"
              required
            />
          </Styled.InputStyles>
        </Styled.Container>
      </Styled.InputRow>
      <Styled.InputRow>
        <Styled.Container>
          <Styled.Label>Address Line2</Styled.Label>
          <Styled.InputStyles>
            <Field
              className="update-input"
              name="addressLine2"
              component="input"
              type="text"
            />
          </Styled.InputStyles>
        </Styled.Container>
      </Styled.InputRow>

      <Styled.InputRow>
        <Styled.AddressContainer>
          <Styled.Label>City</Styled.Label>
          <Styled.InputStyles>
            <Field
              className="update-input"
              name="city"
              component="input"
              type="text"
              required
            />
          </Styled.InputStyles>
        </Styled.AddressContainer>
        <Styled.AddressContainer>
          <Styled.Label>Zip Code</Styled.Label>
          <Styled.InputStyles>
            <Field
              className="update-input"
              name="zipCode"
              component="input"
              type="text"
              required
            />
          </Styled.InputStyles>
        </Styled.AddressContainer>
        <Styled.AddressContainer>
          <Styled.Label>Country</Styled.Label>
          <Styled.InputStyles>
            <Field
              className="hidden"
              name="country"
              component="input"
              type="text"
            />
            <CountryDropdown
              className="countryUpdate-input1"
              value={country}
              onChange={e => {
                setCountry(e);
                dispatch(change('newAdForm', 'country', e));
              }}
            />
          </Styled.InputStyles>
        </Styled.AddressContainer>
      </Styled.InputRow>
      <Styled.ButtonContainer>
        <Styled.CustomButton onClick={getLocation}>
          Upload Address
        </Styled.CustomButton>
      </Styled.ButtonContainer>
    </div>
  );
};

export default connect()(AddressUploader);
