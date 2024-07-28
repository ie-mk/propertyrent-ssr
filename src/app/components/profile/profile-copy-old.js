import React, { useState } from 'react';
import Styled from './profile.styles';
import { reduxForm, Field, change } from 'redux-form';
import { CountryDropdown } from 'react-country-region-selector';
import {
  required,
  email,
  validateForm,
  addValidator,
} from 'redux-form-validators';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const validate = validateForm({
  email: [required(), email()],
});
const Profile = ({ handleSubmit, dispatch }) => {
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleUpdated = () => alert('welcome');

  const digitValidator = addValidator({
    validator: function() {
      if (!isValidPhoneNumber(phoneNumber)) {
        return {
          defaultMessage: 'is not a valid phone number',
        };
      }
    },
  });

  const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <input
          className={type == 'number' ? 'hidden' : 'update-input'}
          {...input}
          placeholder={label}
          type={type}
        />
        {touched &&
          ((error && (
            <Styled.ValidationError>{error}</Styled.ValidationError>
          )) ||
            (warning && (
              <Styled.ValidationError>{warning}</Styled.ValidationError>
            )))}
      </div>
    </div>
  );

  return (
    <>
      <Styled.Title>Edit Profile</Styled.Title>
      <form onSubmit={handleSubmit(handleUpdated)}>
        <Styled.InputRow>
          <Styled.NameContainer>
            <Styled.Label>First Name</Styled.Label>
            <Styled.InputStyles>
              <Field
                className="update-input"
                name="firstName"
                component="input"
                type="text"
              />
            </Styled.InputStyles>
          </Styled.NameContainer>
          <Styled.NameContainer>
            <Styled.Label>Last Name</Styled.Label>
            <Styled.InputStyles>
              <Field
                className="update-input"
                name="lastName"
                component="input"
                type="text"
              />
            </Styled.InputStyles>
          </Styled.NameContainer>
        </Styled.InputRow>
        <Styled.InputRow>
          <Styled.Container>
            <Styled.Label>Email Address</Styled.Label>
            <Styled.InputStyles>
              <Field
                name="email"
                type="email"
                component={renderField}
                validate={[required(), email()]}
              />
            </Styled.InputStyles>
          </Styled.Container>
        </Styled.InputRow>
        <Styled.InputRow>
          <Styled.Container>
            <Styled.Label>Address</Styled.Label>
            <Styled.InputStyles>
              <Field
                className="update-input"
                name="address"
                component="input"
                type="text"
              />
            </Styled.InputStyles>
          </Styled.Container>
        </Styled.InputRow>
        <Styled.InputRow>
          <Styled.Container>
            <Styled.Label>Phone</Styled.Label>
            <Styled.PhoneInputStyles>
              <PhoneInput
                international
                defaultCountry="RU"
                value={phoneNumber}
                onChange={e => {
                  setPhoneNumber(e);
                  dispatch(change('Profile', 'phoneNumber', e));
                }}
              />

              <Field
                className="hidden"
                name="phoneNumber"
                component={renderField}
                type="number"
                validate={[required(), digitValidator()]}
              />
            </Styled.PhoneInputStyles>
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
                  dispatch(change('Profile', 'Country', e));
                }}
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
                type="number"
              />
            </Styled.InputStyles>
          </Styled.AddressContainer>
        </Styled.InputRow>
        <Styled.ButtonContainer>
          <Styled.CustomButton submit={true}>
            UPDATE PROFILE
          </Styled.CustomButton>
        </Styled.ButtonContainer>
      </form>
    </>
  );
};

export default reduxForm({
  form: 'Profile',
  validate,
})(Profile);
